import {useNavigate } from "react-router-dom";
import './HomePage.css';
import { motion } from "framer-motion";
import Swal from "sweetalert2";
export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
    <header className="headera">
   <div className="header-left">
    <span onClick={()=>navigate('/HomePage')}  className="header-item">CodeVerdict</span>
  </div>
    <div className="header-center">
    <span onClick={()=>navigate('/HomePage')} className="header-item">Home</span>
    <span onClick={()=>navigate('/ProblemPage')} className="header-item">Problems</span>
    <span onClick={()=>navigate('/ContestPage')} className="header-item">Contest</span>
    <span onClick={()=>Swal.fire({
           icon: "info",
        title: "Leaderboard",
        text: "Leaderboard will be added soon",
        timer: 1000,
        showConfirmButton: false,
        background: "#0b1b2b",
        color: "#e2e8f0",
        })} className="header-item">Leaderboard</span>
  </div>

  <div className="header-right">
    <span onClick={()=>navigate('/ProfilePage')} className="header-item">Profile</span>
  </div>
     </header>
      <div className="home">
        <section className="hero">
          <h1 className="hero-title">
            Become a Better Programmer
          </h1>
          <p className="hero-subtitle">
            Practice coding problems, prepare for interviews, and compete with developers worldwide.
          </p>

          <div className="hero-actions">
            <motion.button className="primary-btn"
              onClick={()=> navigate("/ProblemPage") }
            initial={{x:-100,opacity:0}}
            animate={{x:0,opacity:1}}
                transition={{duration:1,ease:"easeInOut"}}
            >Start Solving</motion.button>
            <motion.button className="secondary-btn"
              onClick={()=> navigate("/ProblemPage")}
            initial={{x:100,opacity:0}}
            animate={{x:0,opacity:1}}
            transition={{duration:1,ease:"easeIn"}}
            >Explore Problems</motion.button>
          </div>
        </section>

        <section className="stats" >
          <div className="stat-card"
            
          >
            <p>Solve daily problems</p>
            <p>Consistency</p>
          </div>
          
          <div className="stat-card"
          
          >
            <h2>20+</h2>
            <p>Topics</p>
          </div>
          <div className="stat-card">
            <h2>Weekly</h2>
            <p>Contests</p>
          </div>
          <div className="stat-card">
            <h2>Global</h2>
            <p>Leaderboard</p>
          </div>
        </section>

        <section className="features">
          <motion.div className="feature-card"
          initial={{opacity:0,y:30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8}}
          viewport={{once:true,amount:0.3}}
          >
            <h3>Structured Learning</h3>
            <p>
              Solve problems by topic and difficulty to build strong fundamentals.
            </p>
          </motion.div>

          <motion.div className="feature-card"
          initial={{opacity:0,y:50}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8}}
          viewport={{once:true,amount:0.3}}
          >
            <h3>Interview Preparation</h3>
            <p>
              Curated problems asked by top tech companies.
            </p>
          </motion.div>

          <motion.div className="feature-card"
          initial={{opacity:0,y:60}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8,ease:"easeInOut"}} 
          viewport={{once:true,amount:0.3}}
          >
            <h3>Compete & Improve</h3>
            <p>
              Join contests and track your progress on the leaderboard.
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}