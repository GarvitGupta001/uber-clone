# Backend API Documentation


## Table of Contents
- [User Registration](#user-registration)
- [User Login](#user-login)
- [User Profile](#user-profile)
- [User Logout](#user-logout)
- [Other Endpoints](#other-endpoints)


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

## Other Endpoints

<!-- Add documentation for additional endpoints below using the same format as above. -->
