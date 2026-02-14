import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import './MyAllDiscussion.css';
export default function MyAllDiscussions(){
    interface allDiscussions{
    name:string,
    gmail:string,
    problemTitle:string,
    userCode:string,
    date:Date,
    }
    const [data,setData]=useState<allDiscussions[]>([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/discuss/allDiscussions',{withCredentials:true});
                if(response.data.message=== 'successfully got'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'no submission yet'){
                    alert('no submission yet');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <div className="my-discuss-container">
        <h1>This are all your discussions</h1>
        {
            data.map((all,index)=>(
                <div  className="discuss-card" key={index}>
                 <div className="discuss-header"><span className="problem-title">{all.problemTitle}</span>

            <span className="discuss-date">{new Date(all.date).toLocaleDateString()}</span> </div>
              <div className="code-container">
            <code>{all.userCode}</code>
          </div>
       </div>
            ))
        }
        </div>
        </>
    );
}