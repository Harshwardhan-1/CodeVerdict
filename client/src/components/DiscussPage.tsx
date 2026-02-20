import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useEffect } from "react";
import './DiscussPage.css';
export default function DiscussPage(){
    const location=useLocation();
    const harsh=location.state?.ram;
    const [approach,setApproach]=useState<string>('');
    
  //  const send={title:harsh?.title};
// useEffect(()=>{
//     const fetch=async()=>{
//         try{
//             const response=await axios.post('http://localhost:5000/api/discuss/getDiscussion',send,{withCredentials:true});
//             if(response.data.message=== 'successfull'){
//                 setApproach(response.data.data.approach);
//             }
//         }catch(err){
//             const error=err as AxiosError<{message:string}>
//             if(error){
//                 console.log(error);
//             }
//         }
//     };
//     fetch();
// },);



useEffect(()=>{
    if(!harsh?.title)return;
    const sendUseEff={title:harsh?.title};
    const fetch=async()=>{
        try{
            const response=await axios.post('http://localhost:5000/api/discuss/getDiscussion',sendUseEff,{withCredentials:true});
            if(response.data.message=== 'successfull'){
                setApproach(response.data.data.approach);
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'no discussion of this question'){
                alert('no discussion of this question');
            }
        }
    };
    fetch();
},[harsh?.title]);




    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
const send={title:harsh?.title,userCode:harsh?.userCode,approach};
try{
    const response=await axios.post('http://localhost:5000/api/discuss/addDiscuss',send,{withCredentials:true});
    if(response.data.message=== 'successfully submitted'){
        alert('successfully submitted thanks for discussion');
    }
}catch(err){
    const error=err as AxiosError<{message:string}>
    if(error.response?.data?.message=== 'provide proper detail'){
        alert('provide proper detail');
    }else if(error.response?.data?.message=== 'approach must be atleast of 10 characters'){
        alert('approach must be atleast of 10 characters');
    }else if(error.response?.data?.message=== 'try some other question you have already discuss It'){
        alert('try some other question you have already discuss It');
    }else{
        alert("server problem");
    }
}
    }

    // interface discussions{
    //     probelemTitle:string,
    //     approach:string,
    //     date:Date,
//}
// const [data,setData]=useState<discussions[]>([]);

    // const seePrevious=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    //     e.preventDefault();
    //     const sendToDiss={title:harsh?.title};
    //     try{
    //         const response=await axios.post('http://localhost:5000/api/discuss/AllDiscussionOfThisQuestion',sendToDiss,{withCredentials:true});
    //         if(response.data.message=== 'successfull'){
    //             setData(response.data.data);
    //         }
    //     }catch(err){
    //         const error=err as  AxiosError<{message:string}>
    //         if(error.response?.data?.message=== 'no discussion yet'){
    //             alert('no discussion yet');
    //         }else if(error.response?.data?.message=== 'provide proper detail'){
    //             alert('provide proper detail');
    //         }else if(error.response?.data?.message=== 'no previous discussion'){
    //             alert('no previous discussion');
    //         }
    //     }
    // }

    return(
        <>
           <div className="discuss-container">
      <div className="code-section">
        <h2>{harsh?.title}</h2>
       <pre className="code-box"><code>{harsh?.userCode}</code></pre>
       </div>
        <div className="discussion-section">
        <h2>Discuss Your Approach</h2>
<textarea placeholder="Explain your approach, logic, time complexity, edge cases..." value={approach} onChange={(e)=>setApproach(e.target.value)}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      </div>
{/* 
      {
        data.map((all,index)=>(
            <div key={index}>
                <p>title:{all?.probelemTitle}</p>
                <p>approach:{all?.approach}</p>
                <p>{new Date(all?.date).toLocaleDateString()}</p>
            </div>
        ))
      } */}
        </>
    );
}