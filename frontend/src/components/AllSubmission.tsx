import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './AllSubmission.css';
export default function AllSubmission(){
    interface submission{
        title:string,
        description:string,
        userCode:string,
    }
    const [data,setData]=useState<submission[]>([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('https://codeverdict-backend.onrender.com/api/submit/allSubmission',{withCredentials:true});
                setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);
    return(
        <>
          <div className="all-submission-page">
        <h1 className="all-submission-title">List of Submission</h1>
        {
            data.map((all,index)=>(
                <div  className="submission-card" key={index}>
                <p className="submission-title">{all?.title}</p>
                <p className="submission-description">{all?.description}</p>
                <pre className="submission-code">{all.userCode}</pre>
            </div>
            ))
        }
        </div>
        </>
    );
}