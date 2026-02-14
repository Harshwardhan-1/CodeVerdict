import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProblemPage.css';
import { AxiosError } from 'axios';
export default function ProblemPage(){
    const [chooseTopic,setChooseTopic]=useState<string>('');
    const navigate=useNavigate();
    interface Question{
        _id:string
        title:string,
        description:string,
        constraint:string,
        sampleInput:string,
        sampleOutput:string,
        difficulty:string,
        topic:string,
    }
    const [data,setData]=useState<Question[]>([]);
    const [search,setSearch]=useState<string>('');
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('http://localhost:5000/api/newQuestion/seeAllQuestion',{withCredentials:true});
if(response.data.message=== 'all question'){
    setData(response.data.data);
} 
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'this are all the question'){
                    alert('this are all the question');
                }
            }
        };
        fetch();
    },[]);

    const handleTitle=async(all:Question)=>{
        navigate('/ParticularProblem',{state:{harsh:all}})
    }


  
    const handleContest=async()=>{
        navigate('/ContestPage');
    }
   

    const handleProfile=async()=>{
        navigate('/ProfilePage');
    }
    const handle=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const send={chooseTopic};
        try{
            const response=await axios.post('http://localhost:5000/api/newQuestion/showSelectedQuestion',send,{withCredentials:true});
            if(response.data.message=== 'successfull'){
                navigate('/ShowParticularTopicQuestion',{state:{ram:response.data.data}});
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'admin has not yet question on this topic'){
                alert('admin has not yet question on this topic');
            }
        }
    }
const home=async()=>{
navigate('/HomePage');
}



    
    return(
        <>
          <div className="problem-page">
        <header className="problem-header">
            <button onClick={home}>Home</button>
          <button>Problems</button>
          <button onClick={handleContest}>Contest</button>
          <button onClick={handleProfile}>Profile</button>
        </header>


         <h2>List Of Problems</h2>
          <div className="filter-bar">
                <select value={chooseTopic}onChange={(e) => setChooseTopic(e.target.value)}>
                    <option value="">Choose Topic</option>
                    <option value="Array">Array</option>
                    <option value="String">String</option>
                    <option value="Hashing">Hashing</option>
                    <option value="Dynamic Programming">Dynamic Programming</option>
                </select>
                <button onClick={handle}>Apply</button>
            </div>

<input type="text"  className="search-input" placeholder='Search problem by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div className="problem-list">
        {
            data.filter((item)=>
             item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((all,index)=>(
                <div  className="problem-card" key={index}>
                    <span className="problem-number"> {index + 1}.</span>
                    <button onClick={()=>handleTitle(all)}>{all?.title}</button>
                    <span>{all.difficulty}</span>
                </div>
            ))
        }
        </div>
        </div>
        </>
    );
}