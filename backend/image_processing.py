import cv2
import numpy as np
from PIL import Image

def process_image(image_file, resolution, rotation):
    # Read the image as a numpy array
    img = np.array(Image.open(image_file))
    
    # Resize the image according to the resolution factor
    width, height = img.shape[1], img.shape[0]
    new_width = int(width * resolution / 100)
    new_height = int(height * resolution / 100)
    resized_img = cv2.resize(img, (new_width, new_height))

    # Rotate the image according to the rotation angle
    rotated_img = cv2.rotate(resized_img, cv2.ROTATE_90_CLOCKWISE * (rotation // 90))

    # Apply noise reduction using Gaussian blur
    blurred_img = cv2.GaussianBlur(rotated_img, (3, 3), 0)

    # Apply sharpening using Laplacian filter
    laplacian_img = cv2.Laplacian(blurred_img, cv2.CV_8U)
    sharpened_img = cv2.add(blurred_img, laplacian_img)

    # Apply antialiasing using bilateral filter
    antialiased_img = cv2.bilateralFilter(sharpened_img, 9, 75, 75)

    # Convert back to a PIL Image
    processed_image = Image.fromarray(antialiased_img)
    
    return processed_image

def remove_watermark(image_file, x, y, width, height):
    # Read the image as a numpy array
    img = np.array(Image.open(image_file))
    
    # Define the region where the watermark is located
    region = img[y:y+height, x:x+width]

    # Apply the watermark removal logic using inpainting
    mask = np.ones(region.shape[:2], dtype=np.uint8) * 255  # Create a white mask for the region
    inpainted_region = cv2.inpaint(region, mask, 3, cv2.INPAINT_TELEA)  # Inpaint the region using Telea algorithm

    # Replace the region in the original image
    img[y:y+height, x:x+width] = inpainted_region
    
    # Convert back to a PIL Image
    processed_image = Image.fromarray(img)
    
    return processed_image
