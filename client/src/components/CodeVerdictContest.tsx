import {useEffect} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function CodeVerdictContest(){
     interface contest{
        _id:string,
        name:string,
        gmail:string,
        organizingDate:string,
        startingTimeOfContest:string,
        endingTimeOfContest:string,
        instructions:string,
        questions:string[],
    }
    const [data,setData]=useState<contest[]>([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/verdict/allCodeVerdictContest',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'provide proper detail'){
                    alert('admin has not add any contest');
                }else if(error.response?.data?.message=== 'gmail not found do sign up first'){
                    alert('gmail not found do sign up first');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <h1>This are the list of Contest</h1>
        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all?._id}</p>
                    <p>{all?.name}</p>
                    <p>{all?.gmail}</p>
                    <p>{all?.instructions}</p>
                    <p>{new Date(all?.organizingDate).toLocaleDateString()}</p>
                    <p>{new Date(all?.startingTimeOfContest).toLocaleTimeString("en-IN",{
                        hour:"2-digit",
                        minute:"2-digit",
                        hour12:true
                    })}</p>
                    <p>{new Date(all?.endingTimeOfContest).toLocaleTimeString("en-IN",{
                        hour:"2-digit",
                        minute:"2-digit",
                        hour12:true,
                    })}</p>
                    <p>
  Join Link :<Link  to={`/verdict/join/${all._id}`} target="_blank"
    rel="noopener noreferrer" style={{ color: "blue" }}>
    http://localhost:5173/join/{all._id}
  </Link>
</p>
                </div>
            ))
        }
        </>
    );
}