import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ShowParticularTopicQuestion(){
    const navigate=useNavigate();
    interface Question{
        title:string,
        description:string,
        constraint:string,
        sampleInput:string,
        sampleOutput:string,
        difficulty:string,
        topic:string,
    }
    const location=useLocation();
    const rame=location.state?.ram as Question[];
    const [search,setSearch]=useState<string>('');


    const handleTitle=async(all:Question)=>{
        navigate('/ParticularProblem',{state:{harsh:all}})
    }
    return(
        <>
        <h1>Topic wise question only</h1>
        <input type="text" placeholder='Enter problem name here' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {
            rame.filter((item)=>
             item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((all,index:number)=>(
                <div  className="problem-card" key={index}>
                    <span className="problem-number"> {index + 1}.</span>
                    <button onClick={()=>handleTitle(all)}>{all?.title}</button>
                    <span>{all.difficulty}</span>
                </div>
            ))
        }
        </>
    );
}