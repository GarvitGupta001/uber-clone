# Backend API Documentation

**Jump to:** [User Endpoints](#user-endpoints) | [Captain Endpoints](#captain-endpoints) | [Map Endpoints](#map-endpoints) | [Ride Endpoints](#ride-endpoints)

## User Endpoints

### Table of Contents
- [User Registration](#user-registration)
- [User Login](#user-login)
- [User Profile](#user-profile)
- [User Logout](#user-logout)

---

## User Registration

### Endpoint
`POST /user/register`

Registers a new user in the system.

### Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The password is securely hashed before being stored. Upon successful registration, a JWT authentication token and the user object are returned.

### Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```

#### Validation Rules
- `fullname.firstname`: Required, minimum 3 characters
- `email`: Required, must be a valid email
- `password`: Required, minimum 8 characters

### Response
#### Success (201 Created)
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "error": [
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    // ...other validation errors
  ]
}
```

### Notes
- The password is never returned in the response.
- The JWT token can be used for authenticated requests.
- Email must be unique; duplicate emails will result in an error.
- All fields are required except `fullname.lastname`.

---

## User Login

### Endpoint
`POST /user/login`

Authenticates a user and returns a JWT token upon successful login.

### Description
This endpoint allows an existing user to log in using their email and password. If the credentials are valid, a JWT authentication token and the user object are returned.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```

#### Validation Rules
- `email`: Required, must be a valid email
- `password`: Required

### Response
#### Success (200 OK)
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "error": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    },
    // ...other validation errors
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Invalid email or password"
}
```

### Notes
- The password is never returned in the response.
- The JWT token can be used for authenticated requests.
- Both email and password are required for login.

---

## User Profile

### Endpoint
`GET /user/profile`

Returns the authenticated user's profile information.

### Description
This endpoint retrieves the profile details of the currently authenticated user. The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

### Notes
- Requires authentication via JWT token.
- The password is never returned in the response.

---

## User Logout

### Endpoint
`GET /user/logout`

Logs out the authenticated user by blacklisting the current JWT token.

### Description
This endpoint logs out the currently authenticated user by invalidating their JWT token (e.g., by adding it to a blacklist). The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "message": "Successfully logged out"
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

### Notes
- Requires authentication via JWT token.
- The token is blacklisted and cannot be used again.

---


## Captain Endpoints

### Table of Contents
- [Captain Registration](#captain-registration)
- [Captain Login](#captain-login)
- [Captain Profile](#captain-profile)
- [Captain Logout](#captain-logout)

---

## Captain Registration

### Endpoint
`POST /captain/register`

Registers a new captain in the system.

### Description
This endpoint allows a new captain to register by providing their name, email, password, and vehicle details. The password is securely hashed before being stored. Upon successful registration, a JWT authentication token and the captain object are returned.

### Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword123",
  "vehicle": {
    "color": "red",
    "number": "ABC123",
    "capacity": 4,
    "type": "car"
  }
}
```

#### Validation Rules
- `fullname.firstname`: Required, minimum 3 characters
- `email`: Required, must be a valid email
- `password`: Required, minimum 8 characters
- `vehicle.color`: Required
- `vehicle.number`: Required, unique
- `vehicle.capacity`: Required, minimum 1
- `vehicle.type`: Required, one of ['car', 'bike', 'auto']

### Response
#### Success (201 Created)
```
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "red",
      "number": "ABC123",
      "capacity": 4,
      "type": "car"
    }
    // ...other captain fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "error": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    // ...other validation errors
  ]
}
```

### Notes
- The password is never returned in the response.
- The JWT token can be used for authenticated requests.
- Vehicle number must be unique.

---

## Captain Login

### Endpoint
`POST /captain/login`

Authenticates a captain and returns a JWT token upon successful login.

### Description
This endpoint allows an existing captain to log in using their email and password. If the credentials are valid, a JWT authentication token and the captain object are returned.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "jane.smith@example.com",
  "password": "yourpassword123"
}
```

#### Validation Rules
- `email`: Required, must be a valid email
- `password`: Required, minimum 8 characters

### Response
#### Success (200 OK)
```
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "red",
      "number": "ABC123",
      "capacity": 4,
      "type": "car"
    }
    // ...other captain fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "error": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    },
    // ...other validation errors
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Invalid email or password"
}
```

### Notes
- The password is never returned in the response.
- The JWT token can be used for authenticated requests.
- Both email and password are required for login.

---

## Captain Profile

### Endpoint
`GET /captain/profile`

Returns the authenticated captain's profile information.

### Description
This endpoint retrieves the profile details of the currently authenticated captain. The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "red",
      "number": "ABC123",
      "capacity": 4,
      "type": "car"
    }
    // ...other captain fields
  }
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

### Notes
- Requires authentication via JWT token.
- The password is never returned in the response.

---

## Captain Logout

### Endpoint
`GET /captain/logout`

Logs out the authenticated captain by blacklisting the current JWT token.

### Description
This endpoint logs out the currently authenticated captain by invalidating their JWT token (e.g., by adding it to a blacklist). The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "message": "Captain logged out successfully"
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

### Notes
- Requires authentication via JWT token.
- The token is blacklisted and cannot be used again.

---

## Map Endpoints

### Table of Contents
- [Get Coordinates](#get-coordinates)
- [Get Distance and Time](#get-distance-and-time)
- [Get Location Suggestions](#get-location-suggestions)

---

## Get Coordinates

### Endpoint
`GET /map/coordinates`

Retrieves latitude and longitude coordinates for a given place ID.

### Description
This endpoint uses Google Maps API to fetch coordinates for a specific place using its place ID. The request must include a valid JWT token for user authentication.

### Request Parameters
- `placeId` (query parameter): Required string representing the Google Maps place ID

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "coordinates": {
    "lat": 28.7041,
    "lng": 77.1025
  }
}
```

#### Error (400 Bad Request)
```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "placeId",
      "location": "query"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "Place not found: ZERO_RESULTS"
}
```

### Notes
- Requires user authentication via JWT token.
- Uses Google Maps Places API internally.
- Place ID must be a valid Google Maps place identifier.

---

## Get Distance and Time

### Endpoint
`GET /map/distance-time`

Calculates distance and travel time between two locations.

### Description
This endpoint uses Google Maps Distance Matrix API to calculate the distance and estimated travel time between source and destination locations using their place IDs.

### Request Parameters
- `source` (query parameter): Required string, minimum 3 characters, representing source place ID
- `destination` (query parameter): Required string, minimum 3 characters, representing destination place ID

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "Invalid value",
      "param": "source",
      "location": "query"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "No Routes Found"
}
```

### Notes
- Requires user authentication via JWT token.
- Uses Google Maps Distance Matrix API internally.
- Both source and destination place IDs are required.
- Distance is returned in meters (value) and human-readable format (text).
- Duration is returned in seconds (value) and human-readable format (text).

---

## Get Location Suggestions

### Endpoint
`GET /map/suggestions`

Provides location suggestions based on search query.

### Description
This endpoint uses Google Maps Places Autocomplete API to provide location suggestions based on a search query. Results are filtered for locations within India.

### Request Parameters
- `search` (query parameter): Required non-empty string for location search

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "out_len": 5,
  "suggestions": [
    {
      "description": "New Delhi, Delhi, India",
      "matched_substrings": [...],
      "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw",
      "reference": "...",
      "structured_formatting": {
        "main_text": "New Delhi",
        "secondary_text": "Delhi, India"
      },
      "terms": [...],
      "types": [...]
    }
    // ...other suggestions
  ]
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "Invalid value",
      "param": "search",
      "location": "query"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "search query is required"
}
```

### Notes
- Requires user authentication via JWT token.
- Uses Google Maps Places Autocomplete API internally.
- Results are filtered for locations within India (`components=country:in`).
- Returns structured suggestions with place IDs that can be used in other map endpoints.

---

## Ride Endpoints

### Table of Contents
- [Create Ride](#create-ride)
- [Get Fare](#get-fare)
- [Accept Ride](#accept-ride)
- [Start Ride](#start-ride)
- [Complete Ride](#complete-ride)
- [Cancel Ride](#cancel-ride)

---

## Create Ride

### Endpoint
`POST /ride/create`

Creates a new ride request.

### Description
This endpoint allows a user to create a new ride request by providing pickup and destination details along with vehicle type. The system calculates the fare, generates an OTP, and notifies nearby captains via WebSocket.

### Request Body
Send a JSON object with the following structure:

```
{
  "pickup": {
    "main_text": "Connaught Place",
    "secondary_text": "New Delhi, Delhi, India",
    "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw"
  },
  "destination": {
    "main_text": "India Gate",
    "secondary_text": "New Delhi, Delhi, India", 
    "place_id": "ChIJbdwzJ05DDTkR9nSvNmJ7NVo"
  },
  "vehicleType": "car"
}
```

#### Validation Rules
- `pickup.main_text`: Required string
- `pickup.secondary_text`: Required string
- `pickup.place_id`: Required string
- `destination.main_text`: Required string
- `destination.secondary_text`: Required string
- `destination.place_id`: Required string
- `vehicleType`: Required string, must be one of ['bike', 'auto', 'car']

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (201 Created)
```
{
  "success": true,
  "newRide": {
    "_id": "<ride_id>",
    "user": "<user_id>",
    "pickup": {
      "main_text": "Connaught Place",
      "secondary_text": "New Delhi, Delhi, India",
      "place_id": "ChIJL_P_CXMEDTkRw0ZdG-0GVvw"
    },
    "destination": {
      "main_text": "India Gate", 
      "secondary_text": "New Delhi, Delhi, India",
      "place_id": "ChIJbdwzJ05DDTkR9nSvNmJ7NVo"
    },
    "fare": 150,
    "vehicle": "car",
    "status": "pending",
    "otp": "1234"
    // ...other ride fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "vehicle should be bike, auto or car",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "All fields are required"
}
```

### Notes
- Requires user authentication via JWT token.
- Automatically calculates fare based on distance and vehicle type.
- Generates a 4-digit OTP for ride verification.
- Notifies nearby captains with matching vehicle type via WebSocket.
- Ride status is set to 'pending' initially.

---

## Get Fare

### Endpoint
`GET /ride/fare`

Calculates fare for different vehicle types between two locations.

### Description
This endpoint calculates the estimated fare for a ride between pickup and destination locations for all available vehicle types (car, bike, auto).

### Request Parameters
- `pickupPlaceId` (query parameter): Required string representing pickup location place ID
- `destinationPlaceId` (query parameter): Required string representing destination location place ID

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "fares": {
    "car": 150,
    "bike": 80,
    "auto": 120
  }
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "Invalid value",
      "param": "pickupPlaceId",
      "location": "query"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "Origin and Destination required."
}
```

### Notes
- Requires user authentication via JWT token.
- Uses Google Maps Distance Matrix API to calculate distance and time.
- Fare calculation includes base fare, per-km rate, and per-minute rate for each vehicle type.
- Returns fare for all three vehicle types: car, bike, and auto.

---

## Accept Ride

### Endpoint
`POST /ride/accept`

Allows a captain to accept a ride request.

### Description
This endpoint allows an authenticated captain to accept a pending ride request. Once accepted, the ride status changes to 'accepted' and the user is notified via WebSocket.

### Request Body
Send a JSON object with the following structure:

```
{
  "rideId": "<ride_id>"
}
```

#### Validation Rules
- `rideId`: Required string

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "message": "Ride accepted successfully"
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "Invalid value",
      "param": "rideId",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "Ride is not available for acceptance"
}
```

### Notes
- Requires captain authentication via JWT token.
- Only rides with 'pending' status can be accepted.
- Assigns the captain to the ride and changes status to 'accepted'.
- Sends real-time notification to the user via WebSocket.

---

## Start Ride

### Endpoint
`POST /ride/start`

Starts an accepted ride after OTP verification.

### Description
This endpoint allows a captain to start a ride by providing the correct OTP shared with the user. The ride status changes to 'ongoing' after successful OTP validation.

### Request Body
Send a JSON object with the following structure:

```
{
  "rideId": "<ride_id>",
  "otp": "1234"
}
```

#### Validation Rules
- `rideId`: Required string
- `otp`: Required string, exactly 4 characters

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "validatedRide": {
    "_id": "<ride_id>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstName": "Jane", 
        "lastName": "Smith"
      },
      "vehicle": {
        "color": "red",
        "number": "ABC123",
        "type": "car"
      }
    },
    "status": "ongoing"
    // ...other ride fields
  }
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "otp should be of 4 digits",
      "param": "otp",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "Incorrect OTP"
}
```

### Notes
- Requires captain authentication via JWT token.
- OTP must match the one generated during ride creation.
- Changes ride status from 'accepted' to 'ongoing'.
- Sends real-time notification to the user via WebSocket.

---

## Complete Ride

### Endpoint
`POST /ride/finish`

Marks a ride as completed.

### Description
This endpoint allows a captain to mark an ongoing ride as completed. The ride status changes to 'completed' and the user is notified via WebSocket.

### Request Body
Send a JSON object with the following structure:

```
{
  "rideId": "<ride_id>"
}
```

#### Validation Rules
- `rideId`: Required string

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
#### Success (200 OK)
```
{
  "success": true,
  "message": "Ride completed successfully"
}
```

#### Error (400 Bad Request)
```
{
  "sucess": false,
  "errors": [
    {
      "msg": "Invalid value",
      "param": "rideId", 
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)
```
{
  "error": "Unauthorised access"
}
```

#### Error (500 Internal Server Error)
```
{
  "success": false,
  "error": "Ride is not ongoing"
}
```

### Notes
- Requires captain authentication via JWT token.
- Only rides with 'ongoing' status can be completed.
- Changes ride status to 'completed'.
- Sends real-time notification to the user via WebSocket.

---

## Cancel Ride

### Endpoint
`POST /ride/cancel`

Cancels a ride request.

### Description
This endpoint allows a user to cancel their ride request. The implementation for this endpoint is currently not completed in the backend code.

### Request Body
Send a JSON object with the following structure:

```
{
  "rideId": "<ride_id>"
}
```

#### Validation Rules
- `rideId`: Required string

### Request Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Response
*Implementation pending*

### Notes
- Requires user authentication via JWT token.
- Implementation is currently incomplete in the backend code.

---