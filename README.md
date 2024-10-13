Bynry Assignment
A full-stack Profile Management System built using React for the frontend, Node.js for the backend, and MongoDB for the database. This application allows users to browse profiles, view profile details, and manage profiles (add, edit, delete) through an admin panel.

Features
Profile Listing: Displays a list of profiles with search and sort functionality.
Google Maps Integration: Displays the location of a profile based on the address using Google Maps.
Admin Panel: Admins can log in to manage (add, delete) profiles.
Backend API: Built using Node.js and Express to interact with MongoDB.
Frontend: Built using React and Axios to fetch data from the backend.
Tech Stack
Frontend: React, Axios, Google Maps API
Backend: Node.js, Express
Database: MongoDB (local or MongoDB Atlas)
Deployment: Vercel (for frontend) and Render/Heroku (for backend)
Setup Instructions
Follow these steps to set up the project on your local machine:

1. Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/Bynry-Assignment.git
cd Bynry-Assignment
2. Setup the Backend
Navigate to the backend folder:

bash
Copy code
cd backend
Install the backend dependencies:

bash
Copy code
npm install
Configure MongoDB:

If you're using MongoDB Atlas, create a .env file and add your MongoDB URI:
bash
Copy code
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
For a local MongoDB setup, the URI might look like:
bash
Copy code
MONGODB_URI=mongodb://localhost:27017/profileDB
Run the backend server:

bash
Copy code
npm start
The backend will be running on http://localhost:5001.

3. Setup the Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install the frontend dependencies:

bash
Copy code
npm install
Update the Google Maps API key:

Open App.jsx and make sure the correct API key is used in the LoadScript component:
javascript
Copy code
<LoadScript googleMapsApiKey="AIzaSyCaFdDyirXdl-zcNnLbp5k-9yBadGAQu8g">
Run the React frontend:

bash
Copy code
npm run start
The frontend will be running on http://localhost:3000.

MongoDB Data Import
The profileDB.profile-data.json file contains exported MongoDB data. To import it into your MongoDB database:

For Local MongoDB:
bash
Copy code
mongoimport --uri mongodb://localhost:27017/profileDB --collection profile-data --file ./data/profileDB.profile-data.json --jsonArray
For MongoDB Atlas:
bash
Copy code
mongoimport --uri mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname> --collection profile-data --file ./data/profileDB.profile-data.json --jsonArray
Replace <username>, <password>, and <dbname> with your MongoDB credentials.

Deployment
Frontend (Deployed on Vercel)
Push the frontend code to a GitHub repository.
Deploy the frontend using Vercel.
Backend (Deployed on Render/Heroku)
Push the backend code to a GitHub repository.
Deploy the backend using Render or Heroku.
Make sure to configure environment variables like MONGODB_URI on the deployment platform.

Contributing
Feel free to fork this repository and submit pull requests. Contributions are always welcome!
