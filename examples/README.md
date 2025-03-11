# PixelDojo API Examples

This directory contains example code for using the PixelDojo API in different programming languages.

## Node.js Example

The Node.js example demonstrates how to:
- Generate images using the PixelDojo API
- Save the generated images to local files

### Requirements
- Node.js 18.0.0 or higher (for native fetch support)

### Usage
1. Open `node-example.js` and replace `'your_api_key_here'` with your actual API key
2. Run the example:
```bash
node node-example.js
```

## Python Example

The Python example demonstrates how to:
- Generate images using the PixelDojo API
- Save the generated images to a local directory

### Requirements
- Python 3.6 or higher
- Requests library (`pip install requests`)

### Usage
1. Open `python-example.py` and replace `"your_api_key_here"` with your actual API key
2. Run the example:
```bash
python python-example.py
```

## Customizing the Examples

Both examples include functions that accept options for customizing the image generation:

- `prompt`: Text description of the image you want to generate
- `model`: AI model to use (e.g., "flux-pro", "flux-1.1-pro")
- `aspect_ratio`: Aspect ratio of the generated image (e.g., "16:9", "1:1")
- `num_outputs`: Number of images to generate (1-4)
- `seed`: Seed for reproducible results (-1 for random)

For more details on available parameters, see the [API Documentation](../API_DOCUMENTATION.md). 