# Backend API Documentation


## Table of Contents
- [User Registration](#user-registration)
- [User Login](#user-login)
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

## Other Endpoints

<!-- Add documentation for additional endpoints below using the same format as above. -->
