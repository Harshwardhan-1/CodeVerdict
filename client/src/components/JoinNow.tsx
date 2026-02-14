import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
export default function JoinNow(){
    const {contestId}=useParams();
    const navigate=useNavigate();
    interface joinNow{
        contestId:string,
        name:string,
        gmail:string,
        organizingDate:string,
        startingTimeOfContest:string,
        endingTimeOfContest:string,
        instructions:string,
        questions:string[],
    }

    interface contestQuestions{
        _id:string,
        title:string,
        sampleInput:string,
        sampleOutput:string,
        topic:string,
        description:string,
        difficulty:string,
    }


    interface LeaderBoard{
        name:string,
        gmail:string,
        points:number,
    }


    const [data,setData]=useState<joinNow>();
    const [contestQuestion,setContestQuestion]=useState<contestQuestions[]>([]);
    const [showLeaderBoardResult,setShowLeaderBoardResult]=useState<LeaderBoard[]>([]);
    const send={id:contestId};
    useEffect(()=>{
        const fetch=async()=>{
            try{
               const response=await axios.post('http://localhost:5000/api/contest/joinContest',send,{withCredentials:true});
               if(response.data.message=== 'contest is live'){
                setData(response.data.data);
               } 
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message===  'contest not found'){
                    alert('contest not found');
                }
                if (error.response?.status === 401) {
                navigate(`/SignInPage?redirect=/join/${contestId}`);
            }
            }
        };
        fetch();
    })

    const showQuestions=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const send={questionsId:data?.questions};
        try{
            const response=await axios.post('http://localhost:5000/api/contest/showContestQuestion',send,{withCredentials:true});
            if(response.data.message=== 'got successfull'){
                alert('got all question');
                setContestQuestion(response.data.data);
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }
        }
    }




    const handleTitle=async(all:contestQuestions)=>{
navigate('/ContestQuestion', {state: {harshw: {...all,contestId: contestId,joinNow:data,
    }
  }
});    
}

const showLeaderBoard=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const send={contestId:contestId};
    try{
        const response=await axios.post('http://localhost:5000/api/contest/showLeaderBoard',send,{withCredentials:true});
        if(response.data.message=== 'successfull'){
            alert('successfull got leaderBoard');
         
            const submissions: {
                name: string;
                gmail: string;
                points: number;
            }[] = response.data.data;


            const leaderboardMap = new Map<string, LeaderBoard>();
            submissions.forEach((sub) => {
                if (leaderboardMap.has(sub.gmail)) {
                    const existing = leaderboardMap.get(sub.gmail)!;
                    leaderboardMap.set(sub.gmail, {
                        ...existing,
                        points: existing.points + sub.points,
                    });
                } else {
                    leaderboardMap.set(sub.gmail, {
                        name: sub.name,
                        gmail: sub.gmail,
                        points: sub.points,
                    });
                }
            });
            const mergedLeaderboard: LeaderBoard[] = Array.from(
                leaderboardMap.values()
            ).sort((a, b) => b.points - a.points);

            setShowLeaderBoardResult(mergedLeaderboard);
        }
    }catch(err){
        const error=err as AxiosError<{message:string}>
        if(error.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
        }else if(error.response?.data?.message=== 'you dont have submit any solution so you cant see it'){
            alert('you dont have submit any solution so you cant see it');
        }else if(error.response?.data?.message=== 'cannot see leaderboard as contest is not finished yet'){
            alert('cannot see leaderboard as contest is not finished yet');
        }else if(error.response?.data?.message=== 'no one has submit correct answer'){
            alert('no one has submit correct answer so we are not showing leaderboard');
        }
    }
}
    return(
        <>
        {data && (
            <>
        <h1>Contest is live now</h1>
        <p>Contest Id:{contestId}</p>
                    <p>{data?.name}</p>
                    <p>{data?.gmail}</p>
                    <p>{data?.instructions}</p>
                    <p>{new Date(data?.organizingDate).toLocaleDateString()}</p>
                    <p>{new Date(data?.startingTimeOfContest).toLocaleTimeString()}</p>
                    <p>{new Date(data?.endingTimeOfContest).toLocaleTimeString()}</p>
                
    {data?.questions?.map((qid, index) => ( <p key={index}>Question {index + 1} ID: {qid}</p>))}
      </>
        )}
        <button onClick={showQuestions}>See All Questions</button>
        <button onClick={showLeaderBoard}>LeaderBoard</button>




        {
            contestQuestion.map((all,index)=>(
                <div  className="problem-card" key={index}>
                    <span className="problem-number"> {index + 1}.</span>
                    <button onClick={()=>handleTitle(all)}>{all?.title}</button>
                    <p>{all?._id}</p>
                    <span>{all.difficulty}</span>
                </div>
            ))
        }


        {
            showLeaderBoardResult.map((all,index)=>(
                <div key={index}>
                    <p>Rank:{index+1}</p>
                    <p>Name:{all?.name}</p>
                    <p>Gmail:{all?.gmail}</p>
                    <p>Points:{all?.points}</p>
                </div>
            ))
        }
                </>
    );
}