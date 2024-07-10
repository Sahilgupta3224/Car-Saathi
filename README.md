# Car-Saathi

## Description
Car-Saathi is a carpooling platform designed to connect drivers with passengers looking for a ride. This project aims to promote carpooling, reduce traffic congestion, and minimize carbon emissions. Built using React, Node.js, Express, and MongoDB, Car-Saathi provides a seamless and user-friendly experience for ride-sharing.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Libraries/APIs Used](#librariesapis-used)
- [Contributing](#contributing)
- [Team Members](#team-members)
- [Contact](#contact)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Steps
1. Clone the repository
   git clone https://github.com/Sahilgupta3224/Car-Saathi.git
2. Navigate to the project directory
    cd Car-Saathi
   
3. Install server-side dependencies   
    cd server
    npm install

4. Install client-side dependencies
   cd ../client
   npm install

5. Navigate to the socket directory and install dependencies
   cd ../socket
   npm install
   nodemon index.js

6. Create a .env file in the server directory and add your MongoDB connection string and other environment variables:
   MONGODB_URI = MONGO=mongodb+srv://sahil:sahil@cluster0.pnuom1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=3000

7. Start the development server
  - cd server
  - npx nodemon server.js
   
8. Start the client
  - cd ../client
  - npm run start

# Usage

1. Register or log in as a user.
   - Access the registration or login page.
   - Enter your details to create an account or log in.

2. If you are a driver, create a ride offering with details such as destination, date, time, and available seats.
   - Provide details such as destination, date, time, and available seats.
   - Publish the ride offering for passengers to see.

3. If you are a passenger, search for available rides based on your destination and preferred time.
   - Enter your destination and preferred time.
   - Browse through available ride options.

4. Book a ride and contact the driver for further coordination.
   - Select a suitable ride and book it.
   - Use the chat functionality to communicate with the driver.

# Features

1. User authentication and authorization
   - Secure login and registration using JWT.

2. Create, view, and manage ride offerings
   - Drivers can create and manage their ride offerings.

3. Publish rides
   - Easily publish ride details for passengers to find.

4. Search for available rides
   - Passengers can search for rides based on their destination and time preferences.

5. Book a ride
   - Simple booking process for passengers.

6. Chat functionality
   - Real-time communication between drivers and passengers using Socket.io.

7. Payment option available on website
   - Secure payment integration with RazorPAY.

# Tech Stack
1. Frontend: HTML, CSS, React, CSS bootstrap,CSS Tailwind
2. Backend: Node.js, Express
3. Database: MongoDB
4. Real-time Communication: Socket.io

# Libraries/APIs Used
1. Axios
- For making HTTP requests from the frontend to the backend.
2. Google OAuth
- For secure and easy authentication using Google accounts.
3 .Google Maps API
- For integrating maps and location services.
4. Socket.io
- For enabling real-time communication features.
5. RazorPAY
- For handling payments.
6. NodeMailer
- For sending emails.
7. Firebase
- For additional backend services and notifications.
8. Mongoose
- For MongoDB object modeling.
9. Socket.io
- For real-time chat functionality.

# Contributing
-> How to Contribute
1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature-branch)
5. Open a pull request

# Team Members
Sahil Gupta - []
Rudra Sharma - [sharmarudra761@gmail.com]
Khanak Patwari - []
kitarth Shrivastav - []

# Contact
Sahil Gupta - []
Rudra Sharma - [sharmarudra761@gmail.com]
Khanak Patwari - []
kitarth Shrivastav - []

Project Link: https://github.com/Sahilgupta3224/Car-Saathi
