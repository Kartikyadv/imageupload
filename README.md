# Unitoko Image Upload API

A Node.js API for handling image and file uploads to S3-compatible storage.

## Features

- Image upload with automatic thumbnail generation
- General file upload support
- File size validation (max 3MB for images)
- S3-compatible storage integration

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd unitoko-image-upload-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
DO_SPACE_ENDPOINT=<your-space-endpoint>
DO_SPACE_NAME_IMAGES=<your-space-name-for-images>
DO_SPACE_NAME_FILES=<your-space-name-for-files>
DO_SPACE_ACCESS_KEY_IMAGES=<your-access-key-for-images>
DO_SPACE_SECRET_KEY_IMAGES=<your-secret-key-for-images>
DO_SPACE_ACCESS_KEY_FILES=<your-access-key-for-files>
DO_SPACE_SECRET_KEY_FILES=<your-secret-key-for-files>
DO_SPACE_CND_URL_PREFIX_IMAGES=<your-cdn-url-for-images>
DO_SPACE_CND_URL_PREFIX_FILES=<your-cdn-url-for-files>
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Upload Images
- **URL**: `/upload/images`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Form Field**: images (multiple files allowed)
- **Query Parameter**: path (required) - The destination path for uploads
- **Size Limit**: 3MB per image
- **Response**: Returns original and thumbnail URLs

### Upload Files
- **URL**: `/upload/files`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Form Field**: files (multiple files allowed)
- **Query Parameter**: path (required) - The destination path for uploads
- **Response**: Returns file URLs

## Error Codes

- 400: Missing path or files
- 413: File size too large (images > 3MB)
- 500: Server error

## Development

```bash
npm run dev
```

## License

ISC #   i m a g e u p l o a d  
 