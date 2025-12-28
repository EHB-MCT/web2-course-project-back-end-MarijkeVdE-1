# Design Exercises Hub – Backend API

This is the backend API for the Design Exercises Hub project.
The API handles authentication, file uploads and data storage for assignments.

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (file uploads)
- dotenv
- CORS

## Features

- User registration and login
- Secure file uploads (image, video, PDF)
- Assignment storage
- Upload counter per user (used for easter egg feature)
- RESTful API structure

## Installation

1. Navigate to the backend folder
2. Install dependencies:
   npm install

## Create a .env file in the root of the backend with:

- env
- Code kopiëren
- MONGODB_URI=your_mongodb_connection_string
- PORT=5052
- JWT_SECRET=your_secret_key

## Start the server:
- npm run dev
- The server will run on:
- http://localhost:5052

## API Endpoints (overview)
- Base URL: http://localhost:5052/api
- POST /users/register
- POST /users/login
- GET /assets
- POST /assets/upload
- Uploaded files are stored in /uploads and are served statically.

## Sources
- Express documentation
- MongoDB Atlas documentation
- Multer documentation
- ChatGPT (OpenAI) – used as a support tool for debugging, clarification and conceptual guidance

## Notes
The backend is designed to work together with the frontend of the Design Exercises Hub.
Possible future improvements include admin moderation tools and user profile management.