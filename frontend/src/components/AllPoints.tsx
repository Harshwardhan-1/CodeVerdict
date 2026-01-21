import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './AllPoints.css';
export default function AllPoints(){
    interface allpoints{
        title:string,
        points:string
    }
     const [data,setData]=useState<allpoints[]>([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('https://codeverdict-backend.onrender.com/api/submit/allPoints',{withCredentials:true});
                setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);

      const totalPoints=data.reduce((sum, item) => {
    return sum+Number(item.points);
  },0);

    return(
        <>
          <div className="points-page">
        <div className="points-total-box">
        <span>{totalPoints}</span>
        </div>
            <div className="points-list">

        {
            data.map((all,index)=>(
                <div className="points-card" key={index}>
                    <p className="points-title">Question Name:{all?.title}</p>
                    <p className="points-score">Points Of This Queston You Get:{all?.points}</p>
                </div>
            ))
        }
        </div>
        </div>
        </>
    );
}