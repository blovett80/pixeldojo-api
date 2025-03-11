# PixelDojo API Documentation

## Base URL

```
https://pixeldojo.ai/api/v1
```

## Authentication

All API requests require authentication using an API key. You can obtain your API key from the [PixelDojo API Platform](https://pixeldojo.ai/api-platform).

Include your API key in the `Authorization` header of your requests:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Generate Images

```
POST /flux
```

Generate images using the PixelDojo AI models.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Text description of the image you want to generate |
| `model` | string | Yes | AI model to use for generation (see Models section) |
| `aspect_ratio` | string | No | Aspect ratio of the generated image (default: "16:9") |
| `num_outputs` | integer | No | Number of images to generate (default: 1, max: 4) |
| `seed` | integer | No | Seed for reproducible results (-1 for random seed) |
| `lora_weights` | string | No | URL to a Flux LoRA model (only for flux-dev-single-lora model) |
| `lora_scale` | float | No | Scale factor for the LoRA model (default: 0.7) |
| `megapixels` | string | No | Resolution control (default: "1") |
| `go_fast` | boolean | No | Optimization flag (default: false) |

#### Example Request

```json
{
  "prompt": "A beautiful sunset over a mountain landscape, highly detailed",
  "model": "flux-pro",
  "aspect_ratio": "16:9",
  "num_outputs": 1,
  "seed": -1
}
```

#### Example Response

```json
{
  "id": "gen_abc123xyz456",
  "created": 1678901234,
  "images": [
    "https://pixeldojo.ai/generated/abc123xyz456_1.png"
  ],
  "model": "flux-pro",
  "prompt": "A beautiful sunset over a mountain landscape, highly detailed"
}
```

## Models

The following models are available for image generation:

| Model ID | Description |
|----------|-------------|
| `flux-pro` | Standard high-quality image generation model |
| `flux-1.1-pro` | Updated version with improved details and coherence |
| `flux-1.1-pro-ultra` | Premium version with enhanced quality and detail |
| `flux-dev-single-lora` | Experimental model with custom LoRA support |

## Error Codes

| Code | Description |
|------|-------------|
| `invalid_api_key` | The API key is invalid or missing |
| `invalid_request` | The request parameters are invalid |
| `model_not_found` | The specified model does not exist |
| `quota_exceeded` | You have exceeded your API quota |
| `server_error` | An internal server error occurred |

## Rate Limits

- Free tier: 10 requests per minute
- Pro tier: 60 requests per minute
- Enterprise tier: Custom limits

## Image Retention

Generated images are stored for 24 hours before being automatically deleted.

## Credits

Each generated image consumes 1 credit from your account. Credits are replenished according to your subscription plan. 