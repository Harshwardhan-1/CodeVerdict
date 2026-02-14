    import {useState} from 'react';
    import {useEffect} from 'react';
    import axios from 'axios';
    import { AxiosError } from 'axios';
    import { useNavigate } from 'react-router-dom';
    import './OrganizeContest.css';
    export default function OrganizeContest(){
        const navigate=useNavigate();
        interface question{
            _id:string,
            title:string,
            description:string,
            constraint:string,
            sampleInput:string,
            sampleOutput:string,
            difficulty:string,
            topic:string,
        }
        const [data,setData]=useState<question[]>([]);
        const [name,setName]=useState<string>('');
        const [gmail,setGmail]=useState<string>('');
        const [organizingDate,setOrganizingDate]=useState<string>('');
        const [startingTime,setStartingTime]=useState<string>('');
        const [endingTime,setEndingTime]=useState<string>('');
        const [selectedQuestions,setSelectedQuestions]=useState<string[]>([]);
        const [instructions,setInstructions]=useState<string>('');
        useEffect(()=>{
            const fetch=async()=>{
                try{
                    const response=await axios.get('http://localhost:5000/api/newQuestion/seeAllQuestion',{withCredentials:true});
                    if(response.data.message=== 'all question'){
                        setData(response.data.data);
                    }
                }catch(err){
                    const error=err as AxiosError<{message:string}>
                    if(error.response?.data?.message=== 'admin has not yet add yet question'){
                        alert('admin has not yet add yet question');
                    }
                }
            };
            fetch();
        },[]);


        const handleTitle=async(all:question)=>{
            navigate('/ParticularProblem',{state:{harsh:all}})
        }


        const organizeContest=async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const send={name,gmail,organizingDate,startingTime,endingTime,selectedQuestions,instructions};
            try{
                const response=await axios.post('http://localhost:5000/api/contest/addContest',send,{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    alert('contest added successfully'+response.data.joinLink);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'provide proper detail'){
                    alert('provide proper detail');
                }else if(error.response?.data?.message=== 'you already have another contest at this time change time or contest date'){
                    alert('you already have another contest at this time change time or contest date');
                }else if(error.response?.data?.message=== 'your name and gmail dont match what you provided at the time of login'){
                    alert('your name and gmail dont match what you provided at the time of login');
                }else if(error.response?.data?.message=== "ending date must be greater than starting date"){
                    alert("ending date must be greater than starting date");
                }else if(error.response?.data?.message=== 'select at least 1 question'){
                    alert("please select atleast one question");
                }else if(error.response?.data?.message=== 'you cannot select previous date'){
                    alert('you cannot select previous date');
                }
            }
        }



        return(
            <>
            <div className="organize-container">
            <h1>Organize Your Contest Here</h1>


            <form onSubmit={organizeContest}>
            <input type="text" placeholder="Enter your name here" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email"  placeholder='Enter your email here' value={gmail} onChange={(e)=>setGmail(e.target.value)}/>
            <p>Enter Organizing Date</p>
            <input type="date" placeholder='Enter organizing date' value={organizingDate} onChange={(e)=>setOrganizingDate(e.target.value)} />
        
            <p>Enter Time Of Starting of Contest</p>
            <input type="time" placeholder='Enter Time of contest here' value={startingTime} onChange={(e)=>setStartingTime(e.target.value)} />      
        
        <p>Enter time of Ending Of Contest here</p>
            <input type="time" placeholder='Enter Time Of Ending Of Contest here' value={endingTime} onChange={(e)=>setEndingTime(e.target.value)} />
            
            <p>Add Instructions</p>
            <input type="text" placeholder='Enter instructions here' value={instructions} onChange={(e)=>setInstructions(e.target.value)} />


            <h1>Select Questions that you want to add in your contest</h1>
            {
                data.map((all,index)=>(
                    <div  className="question-box" key={index}>
                        <div className="question-left">
                    <span > {index + 1}.</span>
                        <button  className="question-title-btn" onClick={()=>handleTitle(all)}>{all?.title}</button>
                        <span className="question-difficulty">{all.difficulty}</span>
                        </div>
    <select value={selectedQuestions.includes(all._id) ? "added" : "select"}
    onChange={(e) => {
        if (e.target.value === "added") {
        setSelectedQuestions([...selectedQuestions, all._id]);
        } else {
        setSelectedQuestions(
            selectedQuestions.filter(id => id !== all._id)
        );
        }
    }}
    >
    <option value="select">Not Selected</option>
    <option value="added">Selected</option>
    </select>
                    </div>
                ))
            }
            <button type='submit'>Submit</button>
            </form>
            </div>
            </>
        );
    }