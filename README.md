# Flixora

Flixora is a **YouTube-like video streaming platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**. It allows users to upload,delete, watch, like, and comment on videos and subscribe to channels while providing a smooth and interactive user experience.

---

## Features

- **Video Management**
  - Upload videos
  - Stream videos smoothly
  - Organize videos by categories and search for content

- **User Authentication**
  - Sign up, login, and logout
  - JWT-based authentication for secure sessions

- **Engagement & Interaction**
  - Like videos
  - Comment on videos
  - Subscribe to channels

- **Real-time Updates**
  - Live updates for likes, comments, and views
  - (Optional) Notification system

---

## Tech Stack

### Frontend
- **React.js** (Vite setup)
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API requests

### Backend
- **Node.js & Express.js** for the server
- **MongoDB & Mongoose** for the database
- **Cloudinary** for video storage
- **JWT & bcrypt** for authentication and security
- **Multer** for handling file uploads

---

## Installation & Setup

### Backend Setup

- **Clone the repository:**
  
  git clone https://github.com/Sanjaygehlot1/Flixora-server.git

  cd flixora-backend

- **Install dependencies:**

    npm install

- **Create a .env file and add the required environment variables:**

    PORT = 8000

    URI=  your_mongodb_connection_string

    CORS_ORIGIN = your_frontend_url

    ACCESS_TOKEN_SECRET= your_access_token_secret

    ACCESS_TOKEN_EXPIRY = your_access_token_expiry    

    REFRESH_TOKEN_SECRET = your_refresh_token_secret    

    REFRESH_TOKEN_EXPIRY = your_refresh_token_expiry

    CLOUDINARY_CLOUD_NAME = your_cloudinary_name

    CLOUDINARY_API_KEY = your_cloudinary_api_key

    CLOUDINARY_API_SECRET = your_cloudinary_api_secret

- **Start the backend server:**

    npm run dev


### Frontend Setup
- **Clone the repository:**

    git clone https://github.com/Sanjaygehlot1/Flixora-client.git

    cd flixora-frontend

- **Install dependencies:**

    npm install

- **Create a .env file in the frontend folder:**

    VITE_BACKEND_URL=http://localhost:8000/api/v1

    VITE_PORT = 3000

- **Start the frontend server:**

    npm run dev

### Contributing
Contributions are welcome! Please fork the repository, create a feature branch, commit your changes, and submit a pull request.

### Support
If you find this project helpful, please give it a ⭐ on GitHub!


