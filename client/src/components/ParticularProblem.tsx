import { useLocation } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import { useEffect } from "react";
import { AxiosError } from "axios";
import './ParticularProblem.css';
import { useNavigate } from "react-router-dom";
import {Editor} from "@monaco-editor/react";
import { io } from "socket.io-client";
export default function ParticularProblem(){
  const navigate=useNavigate();

    interface TestCase{
       testCaseNumber:number,
        input:string,
        expectedOutput:string,
        userOutput:string,
        status:string,
    }

  

    interface submitCheckIt{
      alreadySubmit:string,
      userCode:string,
    }

interface RunResult{
  message:string,
  passed:number,
  total:number,
  data:TestCase[]
}

const [result, setResult]=useState<RunResult | null>(null);
    const [language,setLanguage]=useState('');
    const [userCode,setUserCode]=useState('');
    const [loading,setLoading]=useState(false);
    const [submitCheck,setSubmitCheck]=useState<submitCheckIt>();
   const location=useLocation();
    const harsh=location.state?.harsh;
   
//     useEffect(()=>{
//       if(!language || !harsh?.title)return;
//       setUserCode("");
//       const send={language:language,title:harsh?.title};
//       const fetch=async()=>{
//         try{
//           const response=await axios.post('http://localhost:5000/api/submit/getSolution',send,{withCredentials:true});
//           if(response.data.message=== 'successfull'){
//             setUserCode(response.data.data.userCode);
//           }
//         }catch(err){
//         console.log(err);
//         }
//       };
//       fetch();
// },[language,harsh?.title]);


useEffect(() => {
  if (!language || !harsh?.title) return;

  let cancelled = false;

  const send = {
    language,
    title: harsh.title,
  };

  const fetchSolution = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/submit/getSolution",send,{ withCredentials: true });
      if (cancelled) return;
      if (response.data.message === "successfull") {
        setUserCode(response.data.data.userCode);
      } else {
        setUserCode("");
      }
    } catch (err) {
      if (!cancelled) {
        console.log(err);
        setUserCode("");
      }
    }
  };
  fetchSolution();
  return () => {
    cancelled = true;
  };
}, [language, harsh?.title]);

    
const [loadingText,setLoadingText]=useState("");
useEffect(()=>{
  const socket = io("http://localhost:5000");
  socket.on("progress", (data) => {
    console.log(data);
    if(data.type === "running"){
      setLoadingText(`Running test case ${data.testCase}...`);
    }
    if(data.type === "passed"){
      setLoadingText(`Test case ${data.testCase} passed`);
    }
    if(data.type === "failed"){
      setLoadingText(`Test case ${data.testCase} failed`);
    }
  });

  return ()=>{
    socket.disconnect();
  }
}, []);


 
useEffect(()=>{
  const fetch=async()=>{
    try{
      const response=await axios.post('http://localhost:5000/api/submit/checkSubmit',{title:harsh?.title},{withCredentials:true});
      if(response.data.message=== 'successfull'){
        setLanguage(response.data.data.language);
        setUserCode(response.data.data.userCode);
        setSubmitCheck(response.data.data);
      }
    }catch(err){
      const error=err as AxiosError<{message:string}>
      if(error.response?.data?.message=== 'provide proper detail'){
        alert('provide proper detail');
      }
    }
  };
  if(harsh)fetch();
},[harsh]);





    const handleRun=async()=>{
        const send={title:harsh.title,language:language,userCode:userCode};
        setLoading(true); 
        setResult(null);
        try{
const response=await axios.post('http://localhost:5000/api/run/runCode',send,{withCredentials:true});
setResult(response.data);
setLoading(false);
        }catch(err){
          setLoading(false);
            const error= err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'admin has not completely make the question and added does not hidden test case for it'){
                alert('admin has not yet add test cases');
            }
        }
        // finally{
        //     setLoading(false);
        // }
      }


      const handleSubmit=async()=>{
        const send={userId:harsh?.userId,title:harsh.title,description:harsh.description,userCode:userCode,difficulty:harsh?.difficulty,topic:harsh?.topic,language:language};
    if(result?.message=== 'all test case pass'){
            try{
          const response=await axios.post('http://localhost:5000/api/submit/userCode',send,{withCredentials:true});
          if(response.data.message=== 'successfully submitted'){
            alert('successfully submitted');
          }
        }catch(err){
          const error=err as AxiosError<{message:string}>
          if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
          }else if(error.response?.data?.message=== 'try some other question you have alredy solved it 20 times'){
            alert('try some other question you have alredy solved it multiple times');
          }
        }
      }else{
        alert('first pass all the test case then only you will able to submit it');
      }
      }






      const discussSolution=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(submitCheck){
         navigate('/DiscussPage',{state:{ram:{title:harsh?.title,language,userCode}}})

        }
      else if(result?.message!== 'all test case pass'){
          alert('first pass all the test cases then you will be able to discuss it');
        }else{
          navigate('/DiscussPage',{state:{ram:{title:harsh?.title,language,userCode}}})
        }
      }







      const handleSeeSolution=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const send={title:harsh?.title};
        try{
          const response=await axios.post('http://localhost:5000/api/discuss/checkDiscuss',send,{withCredentials:true});
          if(response.data.message=== 'successfully found'){
            navigate('/SeeSolution',{state:{ra:response.data.data}})
          }
        }catch(err){
          const error=err as AxiosError<{message:string}>
          if(error.response?.data?.message=== 'no one has discuss the solution yet'){
            alert('no one has share the solution yet be the one to share first');
          }else if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
          }
        }
      }


      
    return(
        <>
        <div className="pp-main-container">
         <div className="pp-left">
            <div className="pp-title-row"><p>Title: {harsh?.title}</p>
       {submitCheck?.alreadySubmit === "solved" && (<span className="pp-solved-badge">Solved </span>)}
</div>
            <p>Description:{harsh?.description}</p>
            <p>Constraint:{harsh?.constraint}</p>
            <p>Difficulty:{harsh?.difficulty}</p>
            <p>Topic:{harsh?.topic}</p>
        
    <div className="pp-language-select">
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="Select Langauge">Select Language</option>
            <option value="cpp">C++</option>
            <option value="java">java</option>
            <option value="python">python</option>
        </select>
     </div>
     </div>
      <div className="pp-right">
        <p>Write your code here for problem {harsh?.title}</p>

   <Editor
        height="400px"
        width="100%"
        language={language || "cpp"}
        theme="vs-dark"
        value={userCode}
        onChange={(value) => setUserCode(value || "")}
        options={{
          fontSize: 16,         
          fontFamily: "Fira Code, monospace",
          lineHeight: 22,
          minimap: { enabled: false },
          wordWrap: "on",
          automaticLayout: true
        }}
      />       

  <div className="pp-buttons">
          <button onClick={handleRun} className="pp-run-btn">Run</button>
          <button onClick={handleSubmit} className="pp-submit-btn">Submit</button>
          <button onClick={discussSolution} className="pp-submit-btn">Discuss Solution</button>
          <button onClick={handleSeeSolution} className="pp-submit-btn">View Accepted Solution</button>
           {/* {loading && ( <div className="pp-loading"><p>Running...</p></div>)} */}
          {loading && <p>{loadingText}</p>} 
    </div>
        <div className="pp-testcase pass">
            <p><b>Sample TestCase</b></p>
            <pre>{harsh?.sampleInput}</pre>

            <p><b>Expected Output</b></p>
            <pre>{harsh?.sampleOutput}</pre>
          </div>



            {result && !loading &&(
          <div className="pp-output-box">
            <h3 style={{color: result.message === "all test case pass" ? "#22c55e" : "#ef4444"}}>
              {result.message}
            </h3>
    <p style={{fontWeight:"bold"}}>{result.passed}/{result.total} Test Cases Passed</p>
            {result.data.length>0 && 
            result.data.map((tc, index) => (
              <div key={index} className="pp-testcase fail">
               <p><b>Failed Test Case {tc.testCaseNumber}</b></p>
                <pre>Input: {tc.input}</pre>
                <pre>Expected: {tc.expectedOutput}</pre>
                <pre>Your Output: {tc.userOutput}</pre>
                 <p>Status: <span className="pp-status">{tc.status}</span></p>             
                  </div>
            ))}
          </div>
        )}
      </div>
    </div>
        </>  
    );
}