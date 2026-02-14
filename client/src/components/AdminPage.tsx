import {useState} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
export default function AdminPage(){
    const navigate=useNavigate();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [constraint,setConstraint]=useState('');
    const [sampleInput,setSampleInput]=useState('');
    const [sampleOutput,setSampleOutput]=useState('');
    const [difficulty,setDifficulty]=useState('');
    const [topic,setTopic]=useState('');
    const [points,setPoints]=useState('');


   const handleAddQuestion=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const send={title,description,constraint,sampleInput,sampleOutput,difficulty,topic,points};
    try{
        const response=await axios.post('http://localhost:5000/api/newQuestion/addQuestion',send,{withCredentials:true});
        if(response.data.message=== 'question created successfully'){
            alert('question created successfull');
        }
    }catch(err){
        const error=err as AxiosError<{message:string}>;
        if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
        }else if(error.response?.data?.message=== 'already have sameInput sameOutput for same question'){
            alert('already have sameInput sameOutput for same question');
        }
    }
   }

   const handleAddHidden=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const send={title,sampleInput,sampleOutput};
    try{
    const response=await axios.post('http://localhost:5000/api/hidden/addHidden',send,{withCredentials:true});
    if(response.data.message=== 'succesfully added'){
        alert('successfully added');
    }
    }catch(err){
        const error=err as AxiosError<{message:string}>;
        if(error.response?.data?.message=== 'provide proper details'){
            alert('provide proper details');
        }else if(error.response?.data?.message=== 'you already add same sampleInput and sampleOutput for same question'){
            alert('you already add same sampleInput and sampleOutput for same question');
        }
    }
   }

   const showAllContest=()=>{
    navigate('/ShowAllContest');
   }


   const AddContest=async()=>{
    navigate('/AdminAddCodeVerdictContest');
   }

   const seeAllQuestion=async()=>{
    navigate('/AdminSeeAllQuestion');
   }


    return(
        <>
          <div className="admin-page">
      <div className="admin-container">
        <h1> Admin Add Harshwardhan Yadav Page </h1>
        <form className="admin-form" onSubmit={handleAddQuestion}>
<input type="text" placeholder='Enter question title here' value={title} onChange={(e)=>setTitle(e.target.value)} />
<input type="text" placeholder='Enter question descrption here' value={description} onChange={(e)=>setDescription(e.target.value)} />
<input type="text" placeholder='Enter constraint here' value={constraint} onChange={(e)=>setConstraint(e.target.value)} />
<textarea placeholder="Enter sample input " value={sampleInput} onChange={(e) => setSampleInput(e.target.value)}className="admin-textarea"/>

<textarea placeholder="Enter sample output " value={sampleOutput} onChange={(e) => setSampleOutput(e.target.value)} className="admin-textarea"/>



<input type="text" placeholder='Enter points for this question' value={points} onChange={(e)=>setPoints(e.target.value)} />




<select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
    <option value="Select Language">Select Difficulty</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="hard">hard</option>
    </select>  
    <input type="text" placeholder='Enter topic here' value={topic} onChange={(e)=>setTopic(e.target.value)}/>     
       <button type='submit' >Add Question</button>
       <button type='button' onClick={handleAddHidden}>Add Hidden Test Case</button>
        </form>
        </div>
        </div>




     <button onClick={AddContest}>Add Code Verdict Contest</button>
     <button onClick={showAllContest}>See All Contest</button>
     <button onClick={seeAllQuestion}>See All Questions</button>
        </>
    );
}