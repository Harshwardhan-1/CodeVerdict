## Leetcode-Clone
A full-stack coding platform inspired by LeetCode that enables users to practice data structures and algorithms problems in an interactive environment. The application provides problem browsing, code editing, execution, and result evaluation within a modern web interface.

## Live Demo :
[https://codeVerdict5.vercel.app/](https://codeVerdict5.vercel.app/)

## Demo Video

You can watch the complete working demonstration below:

[Watch Demo Video](assets/video/demo.mp4)

##  Screenshots

### Profile Page
![Profile Page](assets/screenshot/profilePage.png)


### Login Page
![Login](assets/screenshot/login.png)

### Home Page
![Home](assets/screenshot/image1.png)

### HeatMap
![HeatMap](assets/screenshot/heatmaps.png)

### See Problem
![Problem](assets/screenshot/see1Problem.png)

### Discuss Approach
![Discuss](assets/screenshot/discussApproach.png)

### Problem List
![Problem List](assets/screenshot/SeeProblem.png)



### Running
![Running](assets/screenshot/runningTestCase.png)

---

##  Project Overview

Code Verdict replicates the core workflow of an online coding judge.  
Users can browse problems, write solutions, test their code, and participate in structured contests.  
The system is built with scalability and clean architecture in mind.


---

##  Core Features

- Structured problem listing with detailed views  
- Contest participation system  
- Secure authentication and session handling  
- Admin dashboard for managing questions and contests  
- REST-based backend architecture  
- Fully responsive UI  


---

##  Technology Stack

### Frontend
- React  
- TypeScript  
- CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Additional Tools
- JWT Authentication  
- REST APIs  
- Vercel Deployment  


---

##  Project Structure
```
code-verdict/
│
├── client/
├── server/
├── assets/
│   ├── screenshots/
│   └── video/
└── README.md
```

---

##  Installation & Setup

### 1 Clone the Repository

```
git clone https://github.com/Harshwardhan-1/codeVerdict.git
cd codeVerdict
```

### 2️ Install Dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd server
npm install
```

### 3️ Configure Environment Variables

Create a `.env` file inside the `server` directory and add:

```
PORT=5000
MONGO_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND=your_frontend_url
VITE_BACKEND_URL=your_backend_url
```

Modify values according to your environment configuration.

### 4️ Run the Application

Start backend:

```
cd server
npm run dev
```

Start frontend:

```
cd client
npm run dev
```

---




##  Deployment

- Frontend deployed on Vercel  
- Backend can be deployed on Render or Railway  


---

##  Planned Enhancements

- Leaderboard system  
- Submission history  
- Advanced filtering  
- Performance analytics dashboard  
- Discussion section  


---

##  Contribution

Contributions are welcome:

1. Fork the repository  
2. Create a feature branch  
3. Commit your changes  
4. Open a pull request  


---

##  License

This project is open-source and intended for learning and development purposes.