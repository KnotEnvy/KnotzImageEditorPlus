from flask import Flask, request, send_from_directory, send_file, jsonify
from flask_cors import CORS
import json
import os
from image_processing import process_image, remove_watermark

app = Flask(__name__, static_folder='uploads')
CORS(app, resources={
    r"/process": {"origins": "http://localhost:3000"},
    r"/remove_watermark": {"origins": "http://localhost:3000"}
})
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/process', methods=['POST'])
def process_image_route():
    image_file = request.files['image']
    options = json.loads(request.form['options'])
    resolution = int(options.get('resolution', 100))
    rotation = int(options.get('rotation', 0))  # Get the rotation angle

    # Generate a unique filename
    filename = f'processed_image_{resolution}_{rotation}.jpg'
    output_path = os.path.join(UPLOAD_FOLDER, filename)

    # Load and process the image using OpenCV
    processed_image = process_image(image_file, resolution, rotation)
    
    # Save the processed image
    processed_image.save(output_path)

    return {'image': f'http://localhost:8000/uploads/{filename}'}

@app.route('/remove_watermark', methods=['POST'])
def remove_watermark_route():
    image_file = request.files['image']
    options = json.loads(request.form['options'])
    x = int(options.get('x', 0))  # Get the x coordinate of the watermark region
    y = int(options.get('y', 0))  # Get the y coordinate of the watermark region
    width = int(options.get('width', 0))  # Get the width of the watermark region
    height = int(options.get('height', 0))  # Get the height of the watermark region

    # Generate a unique filename
    filename = f'removed_watermark_{x}_{y}_{width}_{height}.jpg'
    output_path = os.path.join(UPLOAD_FOLDER, filename)

    # Load and remove the watermark from the image using OpenCV
    processed_image = remove_watermark(image_file, x, y, width, height)
    
    # Save the processed image
    processed_image.save(output_path)

    return {'image': f'http://localhost:8000/uploads/{filename}'}

if __name__ == '__main__':
    app.run(port=8000)
