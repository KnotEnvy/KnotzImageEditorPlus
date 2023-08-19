from flask import Flask, request, send_from_directory, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import json
import os
import numpy as np

app = Flask(__name__, static_folder='uploads')
CORS(app, resources={
    r"/process": {"origins": "http://localhost:3000"},
    r"/remove_watermark": {"origins": "http://localhost:3000"}
})
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/process', methods=['POST'])
def process_image():
    image_file = request.files['image']
    options = json.loads(request.form['options'])
    resolution = int(options.get('resolution', 100))
    rotation = int(options.get('rotation', 0))  # Get the rotation angle

    # Generate a unique filename
    filename = f'processed_image_{resolution}_{rotation}.jpg'
    output_path = os.path.join(UPLOAD_FOLDER, filename)

    # Load and process the image
    image = Image.open(image_file)
    width, height = image.size
    new_width = int(width * resolution / 100)
    new_height = int(height * resolution / 100)
    resized_image = image.resize((new_width, new_height))

    # Rotate the image
    rotated_image = resized_image.rotate(rotation)  # Apply rotation
    rotated_image.save(output_path)

    return {'image': f'http://localhost:8000/uploads/{filename}'}

def remove_watermark(image, x, y, width, height):
    # Read the image
    img = np.array(image)
    
    # Define the region where the watermark is located
    region = img[y:y+height, x:x+width]

    # Apply the watermark removal logic (this is a simple example; a more advanced algorithm could be used)
    region_mean = region.mean(axis=(0, 1))
    region[:,:,:] = region_mean

    # Replace the region in the original image
    img[y:y+height, x:x+width] = region
    
    # Convert back to a PIL Image
    processed_image = Image.fromarray(img)
    
    return processed_image

@app.route('/remove_watermark', methods=['POST'])
def remove_watermark_endpoint():
    image_file = request.files['image']
    coordinates_json = request.form['coordinates']
    coordinates = json.loads(coordinates_json)
    
    # Convert coordinates to integers
    x = int(coordinates['x'])
    y = int(coordinates['y'])
    width = int(coordinates['width'])
    height = int(coordinates['height'])

    # Load the image
    image = Image.open(image_file)

    # Remove the watermark
    processed_image = remove_watermark(image, x, y, width, height)

    # Generate a unique filename consistent with the process_image function
    filename = f'watermark_removed_{x}_{y}_{width}_{height}.jpg'
    output_path = os.path.join(UPLOAD_FOLDER, filename)
    processed_image.save(output_path)

    return {'image': f'http://localhost:8000/uploads/{filename}'}





@app.route('/uploads/<filename>', methods=['GET'])
def get_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/download/<filename>', methods=['GET'])
def download_image(filename):
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    return send_file(image_path, as_attachment=True, download_name=filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
