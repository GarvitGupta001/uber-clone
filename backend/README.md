# Uber Clone Backend

A full-featured ride-sharing application backend built with Node.js, Express.js, and MongoDB as part of a MERN stack learning project. This backend provides all the essential functionalities of a ride-sharing platform like Uber, including user and captain (driver) management, real-time ride matching, location services, and WebSocket-based communication.

## What This Project Does

This backend serves as the server-side foundation for an Uber-like ride-sharing application. It handles:

### Core Features
- **User Management**: Registration and authentication for riders
- **Captain Management**: Registration and authentication for drivers
- **Ride System**: Complete ride lifecycle from creation to completion
- **Real-time Communication**: WebSocket integration for live updates between users and captains
- **Location Services**: Integration with Google Maps API for location-based features
- **Payment Flow**: Basic payment confirmation system

### Key Functionalities

#### For Users (Riders)
- Register and login with secure JWT authentication
- Request rides by specifying pickup and destination locations
- Get fare estimates for different vehicle types (car, bike, auto)
- Track ride status in real-time
- Complete payment process

#### For Captains (Drivers)
- Register with vehicle details (color, number, capacity, type)
- Receive ride requests based on proximity
- Accept or decline ride requests
- Start rides using OTP verification
- Complete rides and confirm payment

#### Location & Mapping Services
- Get coordinates from place IDs
- Calculate distance and travel time between locations
- Location-based suggestions and autocomplete
- Find nearby captains within a specified radius

#### Real-time Features
- Live location tracking for users and captains
- Instant ride status updates
- Real-time ride matching and notifications
- WebSocket-based bidirectional communication

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Real-time Communication**: Socket.IO
- **External APIs**: Google Maps API (Places, Distance Matrix, Geocoding)
- **Validation**: express-validator
- **HTTP Requests**: axios
- **CORS**: cors middleware
- **Logging**: morgan
- **Cookie Parsing**: cookie-parser

## Project Structure

```
backend/
├── controllers/           # Request handlers and business logic
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── ride.controller.js
│   └── map.controller.js
├── models/               # Database schemas and models
│   ├── user.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── blacklistToken.model.js
├── routes/               # API route definitions
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── ride.routes.js
│   └── map.routes.js
├── services/             # Business logic and external API calls
│   ├── user.service.js
│   ├── captain.service.js
│   ├── ride.service.js
│   └── map.service.js
├── middlewares/          # Custom middleware functions
│   └── auth.middleware.js
├── utils/               # Utility functions
│   └── db.utils.js
├── app.js               # Express app configuration
├── server.js            # Server initialization
├── socket.js            # WebSocket configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Maps API Key** with the following APIs enabled:
  - Places API
  - Distance Matrix API
  - Geocoding API

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/uber-clone
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/uber-clone

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key

   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key

   # Server Port (optional, defaults to 3000)
   PORT=3000
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   If using MongoDB Atlas, ensure your connection string is correct in the `.env` file.

5. **Run the application**
   
   For development (with auto-restart):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

6. **Verify the installation**
   
   Open your browser and navigate to `http://localhost:3000`
   
   You should see:
   ```json
   {
     "message": "server running",
     "status": 200
   }
   ```

## API Endpoints

### User Endpoints
- `POST /user/register` - Register a new user
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile (protected)
- `GET /user/logout` - User logout (protected)

### Captain Endpoints
- `POST /captain/register` - Register a new captain
- `POST /captain/login` - Captain login
- `GET /captain/profile` - Get captain profile (protected)
- `GET /captain/logout` - Captain logout (protected)

### Ride Endpoints
- `POST /ride/create` - Create a new ride request (protected - user)
- `GET /ride/fare` - Get fare estimates (protected - user)
- `POST /ride/accept` - Accept a ride request (protected - captain)
- `POST /ride/start` - Start a ride with OTP (protected - captain)
- `POST /ride/finish` - Complete a ride (protected - captain)
- `POST /ride/cancel` - Cancel a ride (protected - user)

### Map Endpoints
- `GET /map/coordinates` - Get coordinates from place ID (protected)
- `GET /map/distance-time` - Get distance and time between locations (protected)
- `GET /map/suggestions` - Get location suggestions (protected)

For detailed API documentation, see [API Documentation](README.md).

## Configuration

### Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Places API
   - Distance Matrix API
   - Geocoding API
4. Create credentials (API Key)
5. Add the API key to your `.env` file

### MongoDB Configuration

#### Local MongoDB
```env
MONGO_URI=mongodb://localhost:27017/uber-clone
```

#### MongoDB Atlas
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/uber-clone
```

## Security Features

- JWT-based authentication with secure token generation
- Password hashing using bcrypt
- Token blacklisting for secure logout
- Input validation using express-validator
- CORS configuration for cross-origin requests
- Protected routes with authentication middleware

## Real-time Features

The application uses Socket.IO for real-time communication:

- **Live Location Updates**: Users and captains can update their locations in real-time
- **Ride Matching**: Captains receive instant notifications for nearby ride requests
- **Status Updates**: Real-time ride status updates for all parties
- **Payment Confirmation**: Real-time payment flow between users and captains

## Contributing

This project was created as a learning exercise for the MERN stack. Feel free to fork, modify, and improve upon it!

## Learning Outcomes

Through building this project, you'll learn:

- RESTful API design and implementation
- JWT authentication and authorization
- MongoDB database design and operations
- Real-time communication with WebSockets
- Integration with external APIs (Google Maps)
- Express.js middleware and routing
- Error handling and validation
- Security best practices

---

**Note**: This is a learning project and should not be used in production without proper security audits and additional features like payment gateway integration, comprehensive error handling, and thorough testing.