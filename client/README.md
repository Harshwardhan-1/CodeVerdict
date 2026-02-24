## CodeVerdict(Leetcode-CLone)-Client
This directory contains the frontend of the LeetCode Clone project, built with React and TypeScript. It provides a responsive UI for browsing problems, writing code, running solutions, and tracking user progress.

## Live Demo :
[https://codeVerdict5.vercel.app/](https://codeVerdict5.vercel.app/)

---

##  Features

-  User Authentication (Signup / Login)
-  Problem Listing with Detailed View
-  Code Editor Interface
-  Heatmap Progress Tracking
-  Contest Participation UI
-  Fully Responsive Design

---

##  Tech Stack

- React
- TypeScript
- Vite
- CSS
- Axios

---

##  Project Structure

```
client/
│
├── src/
│   ├── components/
│   ├── main.tsx/
│   └── App.tsx
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---

##  Installation & Setup

### 1 Clone the Repository
```bash
git clone https://github.com/Harshwardhan-1/codeVerdict.git
cd codeVerdict
```


### 2 Install Dependencies

```
npm install
```

###  Run Development Server

```
cd client
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

##  Environment Variables

Create a `.env` file inside the `client` folder and add:

```
VITE_BACKEND_URL=your_backend_url
```

Replace the value with your backend server URL.

---

##  Production Build

To create a production build:

```
npm run build
```

To preview the production build:

```
npm run preview
```

---

##  Deployment

The frontend is optimized for deployment on platforms like:

- Vercel
- Netlify
- Any static hosting service

---

##  Notes

- Ensure backend server is running before starting the frontend.
- Make sure the backend URL is correctly configured in environment variables.

---

##  Author
**Harshwardhan Yadav**
Full Stack Devloper