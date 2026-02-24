#  CodeVerdict (LeetCode Clone) — Server

This directory contains the **backend API** for the CodeVerdict (LeetCode Clone) project.  

The server handles:

-  User authentication and authorization (JWT-based)  
-  Problem management  
-  Code submissions  
-  User progress and statistics  
-  Middleware handling and validation  

The backend is built using **Node.js**, **Express.js**, and **MongoDB**.

---

##  Project Structure

```
server/
│
├── src/
│   ├── controllers/       # Business logic and request handlers
│   ├── middlewares/       # Authentication and error handling
│   ├── models/            # Mongoose models (User, Problem, Submission)
│   ├── routes/            # API route definitions
│   ├── utils/             # Helper and utility functions
│   └── app.js             # Express app configuration
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

##  Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)  

---

##  Installation & Setup

### 1️. Navigate to the server directory

```bash
cd server
```

### 2️. Install Dependencies

```bash
npm install
```

### 3️. Configure Environment Variables

Create a `.env` file in the **root of the server directory**:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the values according to your setup.

### 4️. Run the Server

#### Development mode

```bash
npm run dev
```

#### Production mode

```bash
npm start
```

The server will run at:

```
http://localhost:3000
```

---




# Environment Variables

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `PORT`       | Server port number                    |
| `MONGO_URI`  | MongoDB connection string             |
| `JWT_SECRET` | Secret key used for JWT authentication |

---

## Best Practices

- **Centralized error handling**  
- **Use async/await** for asynchronous operations  
- **JWT-based authentication middleware**  
- **Follow MVC architecture**  
- **Design APIs following RESTful principles**  
- **Environment-based configuration** for flexibility

---


## Author

**Harshwardhan Yadav**  
Full Stack Developer  