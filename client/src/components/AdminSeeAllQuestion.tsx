import { useEffect } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useState } from "react";
export default function AdminSeeAllQuestion(){
    interface showQuestion{
        _id:string,
        title:string,
        description:string,
        constraint:string,
        sampleInput:string,
        sampleOutput:string,
        difficulty:string,
        topic:string,
        points:number,
    }
    const [data,setData]=useState<showQuestion[]>([]);
    const [selectedId,setSelectedId]=useState<string>('');
    const [updateTite,setUpdateTitle]=useState<string>('');
    const [updateDescription,setUpdateDescription]=useState<string>('');
    const [UpdateConstraint,setUpdateConstraint]=useState<string>('');
     const [updateSampleInput,setSampleInput]=useState<string>('');
      const [updateSampleOutput,setSampleOutput]=useState<string>('');
      const [updateDifficult,setUpdateDifficult]=useState<string>('');
      const [updateTopic,setUpdateTopic]=useState<string>('');
      const [updatePoints,setUpdatePoints]=useState<number>(0);

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/newQuestion/getAllAdminQuestion',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'something went wrong'){
                    alert('something went wrong');
                }else if(error.response?.data?.message=== 'no question to show'){
                    alert('no question to show first add question');
                }
            }
        };
        fetch();
    },[])


    const handleDelete=async(_id:string)=>{
        const send={id:_id};
        try{
            const response=await axios.post('http://localhost:5000/api/newQuestion/deleteQuestion',send,{withCredentials:true});
            if(response.data.message=== 'delete successfull'){
                alert('delete successfull');
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'question not found'){
                alert('question not found');
            }
        }
    }

const handleUpdate=async(all:showQuestion)=>{
    setSelectedId(all._id);
    setUpdateTitle(all?.title);
    setUpdateDescription(all?.description);
    setUpdateConstraint(all?.constraint);
    setSampleInput(all?.sampleInput);
    setSampleOutput(all?.sampleOutput);
    setUpdateDifficult(all?.difficulty);
    setUpdateTopic(all?.topic);
    setUpdatePoints(all?.points);
}

const submitUpdate=async()=>{
    const send={id:selectedId,title:updateTite,description:updateDescription,constraint:UpdateConstraint,sampleInput:updateSampleInput,sampleOutput:updateSampleOutput,difficulty:updateDifficult,topic:updateTopic,points:updatePoints};
    try{
        const response=await axios.post('http://localhost:5000/api/newQuestion/updateQuestion',send,{withCredentials:true});
        if(response.data.message=== 'successfull'){
            alert('successfull updated');
            setSelectedId('');
        }
    }catch(err){
        const error=err as AxiosError<{message:string}>
        if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
        }else if(error.response?.data?.message=== 'question not found'){
            alert('question not found');
        }
    }
}
  
    return(
        <>
        <h1>This are all the question</h1>
        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all?._id}</p>
                    <p>{all?.title}</p>
                    <p>{all?.description}</p>
                    <p>{all?.constraint}</p>
                    <p>{all?.sampleInput}</p>
                    <p>{all?.sampleOutput}</p>
                    <p>{all?.difficulty}</p>
                    <p>{all?.topic}</p>
                    <p>{all?.points}</p>
                    <button type="button" onClick={()=>handleDelete(all?._id)}>Delete</button>
                    <button type="button" onClick={()=>handleUpdate(all)}>Update</button>
                     {selectedId===all._id && (
                <div>     
    <input value={updateTite} onChange={e=>setUpdateTitle(e.target.value)} />
    <input value={updateDescription} onChange={e=>setUpdateDescription(e.target.value)} />
    <input value={UpdateConstraint} onChange={(e)=>{setUpdateConstraint(e.target.value)}} />
    <input value={updateSampleInput} onChange={e=>setSampleInput(e.target.value)} />
    <input value={updateSampleOutput} onChange={e=>setSampleOutput(e.target.value)} />
    <input value={updateDifficult} onChange={e=>setUpdateDifficult(e.target.value)} />
    <input value={updateTopic} onChange={e=>setUpdateTopic(e.target.value)} />
    <input type="number"value={updatePoints} onChange={(e)=>setUpdatePoints(Number(e.target.value))}/>
    <button onClick={submitUpdate}>Save Update</button>
                </div>
            )
        }
                </div>
            ))
        }
        </>
    );
}