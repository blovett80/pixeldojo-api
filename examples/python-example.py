#!/usr/bin/env python3
"""
PixelDojo API - Python Example

This example demonstrates how to use the PixelDojo API to generate images
using Python and the requests library.
"""

import os
import json
import requests
from typing import Dict, Any, List, Optional, Union

# Replace with your actual API key
API_KEY = "your_api_key_here"

# API endpoint
API_URL = "https://pixeldojo.ai/api/v1/flux"


def generate_images(options: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate images using the PixelDojo API

    Args:
        options: Dictionary of generation options

    Returns:
        API response as a dictionary
    """
    default_options = {
        "prompt": "A beautiful sunset over a mountain landscape, highly detailed",
        "model": "flux-pro",
        "aspect_ratio": "16:9",
        "num_outputs": 1,
        "seed": -1
    }

    # Merge default options with provided options
    request_body = {**default_options, **options}

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(API_URL, headers=headers, json=request_body)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()
    except requests.exceptions.RequestException as e:
        if hasattr(e.response, 'json'):
            try:
                error_data = e.response.json()
                error_message = error_data.get('error', {}).get('message', 'Unknown error')
                error_code = error_data.get('error', {}).get('code', 'unknown')
                print(f"API Error ({e.response.status_code}): {error_message} (Code: {error_code})")
            except ValueError:
                print(f"API Error: {str(e)}")
        else:
            print(f"Request Error: {str(e)}")
        raise


def save_image(image_url: str, file_path: str) -> None:
    """
    Save an image from a URL to a local file

    Args:
        image_url: URL of the image to download
        file_path: Path where the image should be saved
    """
    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()

        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)

        print(f"Image saved to {file_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error saving image: {str(e)}")
        raise


def main():
    """Main function to demonstrate API usage"""
    try:
        # Create output directory if it doesn't exist
        os.makedirs("generated_images", exist_ok=True)

        # Generate a portrait image
        result = generate_images({
            "prompt": "A majestic eagle in flight against a blue sky, photorealistic",
            "model": "flux-1.1-pro",
            "aspect_ratio": "9:16",
            "num_outputs": 2
        })

        print("Generation successful!")
        print(f"Generation ID: {result.get('id')}")
        print(f"Number of images: {len(result.get('images', []))}")

        # Save the generated images
        for i, image in enumerate(result.get("images", [])):
            image_url = image if isinstance(image, str) else image.get("url")
            file_path = os.path.join("generated_images", f"eagle-{i+1}.png")
            save_image(image_url, file_path)

    except Exception as e:
        print(f"Main process error: {str(e)}")


if __name__ == "__main__":
    main() 