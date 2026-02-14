import { useEffect } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useState } from "react";
export default function ShowAllContest(){
    interface showContest{
        _id:string,
        name:string,
        gmail:string,
        organizingDate:string,
        startingTimeOfContest:string,
        endingTimeOfContest:string,
        instructions:string,
    }
    const [data,setData]=useState<showContest[]>([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/verdict/showAllContest',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'not have any contest to show'){
                    alert('not added any contest');
                }
            }
        };
        fetch();
    },[]);


    const handleDelete=async(_id:string)=>{
        const send={id:_id};
        try{
            const response=await axios.post('http://localhost:5000/api/verdict/deleteVerdictContest',send,{withCredentials:true});
            if(response.data.message=== 'successfully deleted'){
                alert('successfully deleted');
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'not found'){
                alert('contest not found');
            }
        }
    }
    return(
        <>
        <h1>Showing All Contest to Admin</h1>
        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all?._id}</p>
                    <p>{all?.name}</p>
                    <p>{all?.gmail}</p>
                    <p>{new Date(all?.organizingDate).toLocaleDateString()}</p>
                    <p>{new Date(all?.startingTimeOfContest).toLocaleDateString()}</p>
                    <p>{new Date(all?.endingTimeOfContest).toLocaleDateString()}</p>
                    <p>{all?.instructions}</p>
                    <button onClick={()=>handleDelete(all?._id)}>Delete</button>
                </div>
            ))
        }
        </>
    );
}