/**
 * PixelDojo API - Node.js Example
 * 
 * This example demonstrates how to use the PixelDojo API to generate images
 * using Node.js and the fetch API.
 */

// Replace with your actual API key
const API_KEY = 'your_api_key_here';

// API endpoint
const API_URL = 'https://pixeldojo.ai/api/v1/flux';

/**
 * Generate images using the PixelDojo API
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} - API response
 */
async function generateImages(options) {
  const defaultOptions = {
    prompt: 'A beautiful sunset over a mountain landscape, highly detailed',
    model: 'flux-pro',
    aspect_ratio: '16:9',
    num_outputs: 1,
    seed: -1
  };

  // Merge default options with provided options
  const requestBody = { ...defaultOptions, ...options };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error ? data.error.message : 'Unknown error';
      const errorCode = data.error ? data.error.code : 'unknown';
      throw new Error(`API Error (${response.status}): ${errorMessage} (Code: ${errorCode})`);
    }

    return data;
  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
}

/**
 * Save an image from a URL to a local file
 * @param {string} imageUrl - URL of the image to download
 * @param {string} filePath - Path where the image should be saved
 * @returns {Promise<void>}
 */
async function saveImage(imageUrl, filePath) {
  const fs = require('fs');
  const { Readable } = require('stream');
  const { finished } = require('stream/promises');

  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }
    
    const fileStream = fs.createWriteStream(filePath);
    await finished(Readable.fromWeb(response.body).pipe(fileStream));
    
    console.log(`Image saved to ${filePath}`);
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Generate a landscape image
    const result = await generateImages({
      prompt: 'A futuristic cityscape with flying cars and neon lights, cyberpunk style',
      model: 'flux-1.1-pro',
      aspect_ratio: '16:9',
      num_outputs: 2
    });

    console.log('Generation successful!');
    console.log('Generation ID:', result.id);
    console.log('Number of images:', result.images.length);

    // Save the generated images
    for (let i = 0; i < result.images.length; i++) {
      const imageUrl = typeof result.images[i] === 'string' 
        ? result.images[i] 
        : result.images[i].url;
      
      await saveImage(imageUrl, `./generated-image-${i + 1}.png`);
    }
  } catch (error) {
    console.error('Main process error:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  generateImages,
  saveImage
}; 