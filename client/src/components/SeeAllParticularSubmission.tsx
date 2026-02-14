import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
export default function SeeAllParticularSubmission(){
    interface submission{
        title:string,
        description:string,
        userCode:string,
        createdAt:Date,
    }
    const [data,setData]=useState<submission[]>([]);
    const location=useLocation();
    const harsh=location?.state.har;
    const send={title:harsh?.title};
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.post('http://localhost:5000/api/submit/submission',send,{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'provide proper detail'){
                    alert('something went wrong');
                }else if(error.response?.data?.message=== 'no submission yet'){
                    alert('no submission yet');
                }
            }
        };
        fetch();
    });
    return(
        <>
        <h1>This are all the submission of this question</h1>

        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all?.title}</p>
                    <p>{all?.description}</p>
                    <pre>{all?.userCode}</pre>
                    <p>{new Date(all?.createdAt).toLocaleDateString()}</p>
                </div>
            ))
        }
      </>
    );
}