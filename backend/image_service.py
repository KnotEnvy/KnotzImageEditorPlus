from flask import Flask, request, send_from_directory, send_file
from flask_cors import CORS
from PIL import Image
import json
import os

app = Flask(__name__, static_folder='uploads')
CORS(app, resources={r"/process": {"origins": "http://localhost:3000"}})
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


@app.route('/uploads/<filename>', methods=['GET'])
def get_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/download/<filename>', methods=['GET'])
def download_image(filename):
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    return send_file(image_path, as_attachment=True, download_name=filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
