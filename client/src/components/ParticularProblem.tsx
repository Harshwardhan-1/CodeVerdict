import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import "./ParticularProblem.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { CodeEditor } from "./CodeEditor";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function ParticularProblem() {

  const navigate = useNavigate();
  const location = useLocation();
  const harsh = location.state?.harsh;
  const [isblurred,setIsblurred]=useState(false); 


  interface TestCase {
    testCaseNumber: number;
    input: string;
    expectedOutput: string;
    userOutput: string;
    status: string;
  }

  interface RunResult {
    message: string;
    passed: number;
    total: number;
    data: TestCase[];
  }

  interface SubmitCheck {
    alreadySubmit: string;
    userCode: string;
    language: string;
  }

  interface GetInput {
    title: string;
    sampleInput: string;
    sampleOutput: string;
    difficulty: string;
  }

  const [language, setLanguage] = useState("cpp");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [submitCheck, setSubmitCheck] = useState<SubmitCheck>();
  const [input, setInput] = useState<GetInput[]>([]);

  const boilerplates: Record<string, string> = {
    cpp: `
#include <iostream>
using namespace std;
/*
 Write your solution here 
IMPORTANT: 
- Do NOT return the answer 
- PRINT the answer using cout 
*/
void solution(){ 

}

int main() {
   solution();
    return 0;
}`,
    python: `def solve():
    # IMPORTANT: 
    # - Do NOT return the answer 
    # - PRINT the answer using print()
    pass

solve()`,
    java: `public class Main {
    public static void main(String[] args) {
/*
 Write your solution here 
 IMPORTANT: 
- Do NOT return the answer 
- PRINT the answer using 
System.out.println() 
*/
    }
}`
  };

  useEffect(() => {
    if (!language || !harsh?.title) return;

    const fetchSolution = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/submit/getSolution",
          { language, title: harsh.title },
          { withCredentials: true }
        );

        if (response.data.message === "successfull" && response.data.data?.userCode) {
          setUserCode(response.data.data.userCode);
        } else {
          setUserCode(boilerplates[language]);
        }
      } catch {
        setUserCode(boilerplates[language]);
      }
    };

    fetchSolution();
  }, [language, harsh?.title]);



  useEffect(() => {
    if (!harsh?.title) return;

    const fetch = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/newQuestion/getSampleInput",
          { title: harsh.title },
          { withCredentials: true }
        );

        if (response.data.message === "successfull") {
          setInput(response.data.data);
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        }
      }
    };

    fetch();
  }, [harsh?.title]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("progress", (data) => {
      if (data.type === "running") {
        setLoadingText(`Running test case ${data.testCase}...`);
      }
      if (data.type === "passed") {
        setLoadingText(`Test case ${data.testCase} passed`);
      }
      if (data.type === "failed") {
        setLoadingText(`Test case ${data.testCase} failed`);
      }
    });

    return () => {socket.disconnect()};
  }, []);





  useEffect(() => {
    if (!harsh) return;

    const fetch = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/submit/checkSubmit",
          { title: harsh.title },
          { withCredentials: true }
        );

        if (response.data.message === "successfull") {
          setLanguage(response.data.data.language);
          setUserCode(response.data.data.userCode);
          setSubmitCheck(response.data.data);
        }
      } catch(err){
        console.log(err);
      }
    };

    fetch();
  }, [harsh]);

  const handleRun = async () => {
    if (!harsh?.title) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/run/runCode",
        { title: harsh.title, language, userCode },
        { withCredentials: true }
      );

      setResult(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (result?.message !== "all test case pass") {
      alert("First pass all test cases");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit/userCode",
        {
          userId: harsh?.userId,
          title: harsh.title,
          description: harsh.description,
          userCode,
          difficulty: harsh?.difficulty,
          topic: harsh?.topic,
          language
        },
        { withCredentials: true }
      );

      if (response.data.message === "successfully submitted") {
        setIsblurred(true);
          Swal.fire({
            icon: "success",
  title: "Submitted!",
  text: "Your solution has been submitted successfully.",
  timer: 2000,
  showConfirmButton: false,
  background: "#0b1b2b",
  color: "#e2e8f0",
}).then(()=>{
  setIsblurred(false);
})

      }
    } catch (err){
      console.log(err);
    }
  };




const [alreadySubmitted,setAlreadySubmitted]=useState<boolean>(false);
useEffect(()=>{
  const fetch=async()=>{
    const response=await axios.post('http://localhost:5000/api/submit/checkSubmitted',{title:harsh?.title},{withCredentials:true});
    if(response.data.message=== 'successfull'){
      setAlreadySubmitted(true);
    }
  };
  fetch();
},[harsh?.title]);










 const discussSolution = () => {
  if (result?.message === "all test case pass") {
    return navigate("/DiscussPage", {
      state: { ram: { title: harsh?.title, language, userCode } }
    });
  }

  if (alreadySubmitted) {
    return navigate("/DiscussPage", {
      state: { ram: { title: harsh?.title, language, userCode } }
    });
  }

  alert("first pass all the test cases");
};

  const handleSeeSolution = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/discuss/checkDiscuss",
        { title: harsh?.title },
        { withCredentials: true }
      );

      if (response.data.message === "successfully found") {
        navigate("/SeeSolution", { state: { ra: response.data.data } });
      }
    } catch(err){
    console.log(err);
    }
  };
  return (
    <>
      <motion.header className="headeraaaa"
      >
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
     </motion.header>










    <motion.div className={`pp-main-container ${isblurred?"blurred":""}`}
    initial={{y:100,opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:1,ease:"easeIn"}}
    >
      <div className="pp-left">
        <p> Difficulty:{" "}
  <span className={`pp-difficulty-text ${harsh?.difficulty?.toLowerCase()}`}>{harsh?.difficulty}</span>
</p>
        <div className="pp-title-row">
          <p> Title: {harsh?.title}</p>
          {submitCheck?.alreadySubmit === "solved" && (
            <span className="pp-solved-badge">Solved</span>
          )}
        </div>

        <p>Description:{harsh?.description}</p>
        <p><b>Constraints:</b></p>
        <pre>{harsh?.constraint}</pre>

        {!loading && !result && (
          input.map((key, index) => (
            <div key={index}>
              <p>Example:{index + 1}</p>
              <pre>{key.sampleInput}</pre>
              <p><b>Expected Output</b></p>
              <pre>{key.sampleOutput}</pre>
            </div>
          ))
        )}

       
        {loading && (
          <div className="pp-running-box">
            <h3>Running Testcases...</h3>
            <p>{loadingText}</p>
          </div>
        )}
        {result && !loading && (
          <div className="pp-output-box">
            <h3 style={{
              color: result.message === "all test case pass" ? "#22c55e" : "#ef4444"
            }}>
              {result.message}
            </h3>

            <p>{result.passed}/{result.total} Test Cases Passed</p>

            {result.data.map((tc, index) => (
              <div key={index} className="pp-testcase">
                <pre>Input: {tc.input}</pre>
                <pre>Expected: {tc.expectedOutput}</pre>
                <pre>Your Output: {tc.userOutput}</pre>
                <p>Status: {tc.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pp-right">


        <div className="pp-editor-header">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <div>
            <button onClick={handleRun} className="pp-run-btn">Run</button>
            <button onClick={handleSubmit} className="pp-submit-btn">Submit</button>
            <button onClick={discussSolution} className="pp-dis-btn">Discuss </button>
    <button onClick={handleSeeSolution} className="pp-sol-btn">ViewSol</button>
          </div>
        </div>

        <CodeEditor
          code={userCode}
          setCode={setUserCode}
          language={language}
        />

       

      </div>
    </motion.div>
    </>
  );
}