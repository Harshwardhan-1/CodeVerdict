import { useLocation } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import { AxiosError } from "axios";
import './ParticularProblem.css';
export default function ParticularProblem(){
    interface TestCase{
        input:string,
        expectedOutput:string,
        userOutput:string,
        status:string,
    }
    const [result, setResult]=useState<{message:string,data:TestCase[]} | null>(null);
    const [language,setLanguage]=useState('');
    const [userCode,setUserCode]=useState('');
    const [loading,setLoading]=useState(false);
    const location=useLocation();
    const harsh=location.state?.harsh;



    const handleRun=async()=>{
        const send={title:harsh.title,language:language,userCode:userCode};
        setLoading(true); 
        setResult(null);
        try{
const response=await axios.post('https://codeverdict-backend.onrender.com/api/run/runCode',send,{withCredentials:true});
setResult(response.data);
        }catch(err){
            const error= err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'not found'){
                alert('admin has not yet add test cases');
            }
        }finally{
            setLoading(false);
        }
      }


      const handleSubmit=async()=>{
        const send={userId:harsh?.userId,title:harsh.title,description:harsh.description,userCode:userCode};
    if(result?.message=== 'all test case pass'){
            try{
          const response=await axios.post('https://codeverdict-backend.onrender.com/api/submit/userCode',send,{withCredentials:true});
          if(response.data.message=== 'successfully submitted'){
            alert('successfully submitted');
          }
        }catch(err){
          const error=err as AxiosError<{message:string}>
          if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
          }else if(error.response?.data?.message=== 'try some other question you have alredy solved it 3 times'){
            alert('try some other question you have alredy solved it 3 times');
          }
        }
      }else{
        alert('first pass all the test case then only you will able to submit it');
      }
      }

    return(
        <>
        <div className="pp-main-container">
         <div className="pp-left">
            <p>Title:{harsh?.title}</p>
            <p>Description:{harsh?.description}</p>
            <p>Constraint:{harsh?.constraint}</p>
            <p>Difficulty:{harsh?.difficulty}</p>
            <p>Topic:{harsh?.topic}</p>
        
    <div className="pp-language-select">
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="Select Langauge">Select Language</option>
            <option value="C++">C++</option>
            <option value="java">java</option>
            <option value="python">python</option>
        </select>
     </div>
     </div>
      <div className="pp-right">
        <p>Write your code here for problem {harsh?.title}</p>
        <textarea  className="pp-code-editor" placeholder="Write your code here..." value={userCode} onChange={(e)=>setUserCode(e.target.value)}/>
            <div className="pp-buttons">


          <button onClick={handleRun} className="pp-run-btn">Run</button>
          <button onClick={handleSubmit} className="pp-submit-btn">Submit</button>




           {loading && ( <div className="pp-loading"><p>Running...</p></div>)}
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
            {result.data.map((tc, index) => (
              <div key={index} className={`pp-testcase ${tc.status === "Accepted" ? "pass" : "fail"}`}>
                <p><b>Test Case {index + 1}</b></p>
                <pre>Input: {tc.input}</pre>
                <pre>Expected: {tc.expectedOutput}</pre>
                <pre>Your Output: {tc.userOutput}</pre>
                <p>Status: <span className="pp-status" style={{color: tc.status === "Accepted" ? "#22c55e" : "#ef4444"}}>{tc.status}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
        </>  
    );
}