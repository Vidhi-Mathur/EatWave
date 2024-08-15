
# EatWave

EatWave is a responsive and dynamic food ordering application built with the MERN stack. The project focuses on providing a seamless experience for users to browse restaurants, manage their carts, and track orders, all within a secure and optimized environment.


## Features

- **Comprehensive Restaurant Management**
    - Manage restaurant profiles, including details like cuisines, operating hours and photos.
    - Later displayed in detail to the user, including the menu, reviews and photos.
- **Efficient Menu Management**
    - Create and update menu items.
    - Allows curating details such as prices, descriptions, and dietary information.
- **Seamless Cart Management**
    - Adjust item quantities.
    - Intuitive purchasing process, calculating taxes and offering discounts based on total cost.
- **Payment Integration**
    - Razorpay is integrated for handling payments securely and efficiently.
    - Important - Using the free version, so use [test data](https://razorpay.com/docs/payments/payments/test-card-details/) please. 
- **Secure User Authentication**
    - Secure user registration and login.
    - JWT-based authentication and password encryption using Bcrypt.
- **Searching, Filtering and Sorting** 
    - User can find their preferred food item or restaurant through robust searching functionality.
    - Allows filtering and sorting based on multiple criteria, like food preference, cost, restaurant rating and many more.
- **Image Handling**
    - Multer and Cloudinary are used for uploading and managing images.
- **Real-time Order Tracking**
    - WebSockets with Socket.io enable real-time updates on order statuses.
- **User generated reviews** 
    - Allows users to post reviews and ratings, along with an image.
- **Optimized Performance**
    - Techniques such as debouncing, memoization, and lazy loading enhance the application's speed and user experience.


## Tech Stack

### Backend

- [Node.js](https://nodejs.org/en) (v16.x)
- [Express](https://expressjs.com/) (4.19.2)
- [Mongoose](https://mongoosejs.com/) (8.3.2)
- [MongoDB](https://www.mongodb.com/) (6.5.0)
- [Json Web Token (JWT)](https://jwt.io/) (9.0.2)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (2.4.3)
- [Socket.io](https://socket.io/) (4.7.5)
- [Cloudinary](https://cloudinary.com/) (2.2.0)
- [Multer](https://www.npmjs.com/package/multer) (1.4.5-lts.1)
- [Razorpay](https://razorpay.com/?utm_source=google&utm_medium=cpc&utm_campaign=RPSME-RPPerf-GSearchBrand-Prospect-Dweb-Core&utm_adgroup=brandsearch_core_exact&utm_content=RPSME-Brand-010223&utm_term=razorpay&utm_gclid=Cj0KCQjwzva1BhD3ARIsADQuPnX8r0pK0h_nDUkl82-91VIOUbSG3X_RT9k5oN5F9GNazE7H7JA0Xa4aAg99EALw_wcB&utm_campaignID=400139470&utm_adgroupID=27293859910&utm_adID=689518700854&utm_network=g&utm_device=c&utm_matchtype=e&utm_devicemodel=&utm_adposition=&utm_location=9151661&gad_source=1&gclid=Cj0KCQjwzva1BhD3ARIsADQuPnX8r0pK0h_nDUkl82-91VIOUbSG3X_RT9k5oN5F9GNazE7H7JA0Xa4aAg99EALw_wcB) (2.9.4)
- [Express-validator](https://express-validator.github.io/docs/) (7.1.0)

### Frontend

- [React](https://reactjs.org/) (18.2.0)
- [React Router](https://reactrouter.com/) (6.23.0)
- [Material-UI](https://mui.com/) (5.15.15)
- [Tailwind CSS](https://tailwindcss.com/) (3.4.3)
- [Lucide React](https://lucide.dev/) (0.427.0)
- [React Slick](https://react-slick.neostack.com/) (0.30.2)



## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/Vidhi-Mathur/EatWave.git
    ```
2. Navigate to project repository:
    ```bash
   cd EatWave
    ```
### Backend Setup

1. Navigate to the backend directory: 
    ```bash
   cd backend
    ```
2. Install backend dependencies:
    ```bash
   npm install
    ```
3.  Set up the backend environment variables by creating a .env file in the root directory:
    ```bash
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    CLIENT_URL=http://localhost:3001
    ACCESS_SECRET_KEY=<your-access-secret-key>
    REFRESH_SECRET_KEY=<your-refresh-secret-key>
    RAZORPAY_KEY_ID=<your-razorpay-key-id>
    RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
    ```
4. Start the backend server
    ```bash
   node app.js
    ```
### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
   cd frontend
    ```
2. Install frontend dependencies: 
   ```bash
   npm install
    ```
3. Set up the frontend environment variables by creating a .env file in the root directory:
    ```bash
    REACT_APP_SERVER_URL=http://localhost:3000
    ```    
4. Start the frontend server
    ```bash
   npm start
    ```

    
## Project Struture

### Backend 

### Backend
- `/backend`:
    - `/app.js`: Main server file.
    - `/controllers`: Contains the logic for handling incoming requests.
    - `/models`: Defines the database models.
    - `/routes`: Contains the API route definitions.
    - `/uploads/images`: For storing uploaded images.
    - `/validators`: Input Validation logic.
    - `/util`: Utility functions shared across the backend.
    - `.env`: For Environment variables

### Frontend
- `/frontend`: 
    - `/public`: Contains the HTML template and static assets.
    - `App.js`: Main React component.
    - `index.js`: Entry point of React App.
    - `/src`
        - `/components`: 
            - `UI` - UI specific components.
            - `Pages`: Main page components.
            - `restaurant-related`: Restaurant specific components.
            - `user-related`: User specific components.
            - `shared`: Component associated with both user and restaurant.
        - `/services`: Service layer for API calls.
        - `/store`: Context API setup to manage global state, including `/Auth-Context.js` and `/Cart-Context.js`.
        - `/assets`: Contains images and other static resources.
    - `.env`: For Environment variables


## Usage

Once the server and frontend are running:

- Visit http://localhost:3001 to view the EatWave application.
- Make sure server runs on http://localhost:3000 at the same time.
