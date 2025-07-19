# Uber Clone - Frontend

This repository contains the source code for the frontend of a feature-rich Uber clone, built with the MERN stack (MongoDB, Express, React, Node.js). This project was undertaken as a comprehensive learning exercise to master the intricacies of building a real-time, full-stack application. It showcases a complete user flow for both riders and drivers, from authentication to ride completion.

---

## What This Project Does

This application provides the client-side interface for an on-demand ride-sharing service. It is designed to be a single-page application (SPA) that communicates with a backend server to handle user data, ride logistics, and real-time location updates. The goal was to create a seamless and interactive user experience that mimics the core functionalities of Uber.

### Key Features

| Feature                 | For Riders (Users)                                                                                             | For Captains (Drivers)                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Authentication** | Secure sign-up and login with session management.                                                              | Separate sign-up and login, including vehicle registration (type, model, registration number).                        |
| **Ride Booking** | Interactive map to set pickup and destination points with real-time address suggestions.                           | N/A                                                                                                                 |
| **Fare Estimation** | Dynamic fare calculation based on the selected vehicle type (Bike, Auto, Car) and distance.                    | N/A                                                                                                                 |
| **Real-time Ride Matching** | Submits a ride request that is broadcasted to nearby, available captains with the appropriate vehicle type.    | Receives real-time ride requests from nearby users.                                                                 |
| **Ride Management** | View captain's details (name, vehicle, rating), and track the ride status. Includes a 4-digit OTP for verification. | Accept or ignore incoming ride requests. View user's pickup and drop-off locations and the estimated fare.          |
| **Trip Lifecycle** | See when the ride is confirmed, started, and completed.                                                          | Start the trip by verifying the user's OTP. Manage the ongoing ride and mark it as complete.                         |
| **Payment** | A simulated payment screen to complete the transaction.                                                          | Receive a notification upon payment from the user and confirm receipt to finalize the trip.                           |
| **Real-time Updates** | Live updates on ride status and captain's location (in a future implementation).                                 | Real-time notifications for new ride requests and updates on the ride status.                                       |

---

## Tech Stack

This project leverages a modern and efficient technology stack to deliver a high-performance application.
* **Framework/Library**: **React**
* **Build Tool**: **Vite**
* **Routing**: **React Router**
* **Styling**: **Tailwind CSS**
* **Animations**: **GSAP (GreenSock Animation Platform)**
* **HTTP Client**: **Axios** for making API requests to the backend
* **Real-time Communication**: **Socket.IO Client** to connect with the backend for live updates
* **State Management**: **React Context API** for managing user, captain, and socket data across components

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js**: Make sure you have Node.js version 14.x or higher installed.
* **npm** or **yarn**: This project uses `npm`.
* **Running Backend Server**: This is a frontend application that requires a backend to function. Ensure that the corresponding [Uber Clone backend server](https://github.com/GarvitGupta001/uber-clone/tree/main/backend) is running on your local machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/garvitgupta001/uber-clone.git](https://github.com/garvitgupta001/uber-clone.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd frontend
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Configure your environment variables:**

    Create a file named `.env` in the `frontend` directory. This file will hold the URL of your backend server.

    ```env
    VITE_BASE_URL=http://localhost:3000
    ```

    *Note: Replace `http://localhost:3000` with the actual URL where your backend server is running.*

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **View the application:**
    Open your web browser and navigate to `http://localhost:5173`. You should now see the Uber Clone application running.

---

## Project Structure

The project follows a standard React application structure, with a clear separation of concerns.
```
frontend
├── public
│   ├── auto.webp
│   ├── bike.webp
│   ├── car.webp
│   ├── home-background.jpg
│   ├── map_bg.png
│   └── vite.svg
│
├── src
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   │
│   ├── assets
│   │   ├── logo.svg
│   │   └── react.svg
│   │
│   ├── components
│   │   ├── Loader.jsx
│   │   └── LogoHeader.jsx
│   │
│   ├── context
│   │   ├── CaptainContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── UserContext.jsx
│   │
│   └── pages
│       ├── CaptainHome.jsx
│       ├── CaptainLogin.jsx
│       ├── CaptainLogout.jsx
│       ├── CaptainProtectWrapper.jsx
│       ├── CaptainRiding.jsx
│       ├── CaptainSignup.jsx
│       ├── Landing.jsx
│       ├── UserHome.jsx
│       ├── UserLogin.jsx
│       ├── UserLogout.jsx
│       ├── UserProtectWrapper.jsx
│       ├── UserRiding.jsx
│       └── UserSignup.jsx
├── index.html
└── package.json

```
---

## Screenshots

*(Placeholder for screenshots of the application)*

---

**Disclaimer:** This project is for educational purposes only and is not intended for commercial use. It is a clone of a proprietary application and does not have any affiliation with Uber Technologies Inc.