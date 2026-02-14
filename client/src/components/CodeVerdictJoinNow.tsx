import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface Contest {
  _id: string;
  name: string;
  gmail: string;
  organizingDate: string;
  startingTimeOfContest: string;
  endingTimeOfContest: string;
  instructions: string;
  questions: string[];
}
interface contestQuestions{
    _id:string,
    title:string,
    difficulty:string,
}

  interface LeaderBoard{
        name:string,
        gmail:string,
        points:number,
    }


export default function CodeVerdictJoinNow() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Contest | null>(null);
    const [contestQuestion,setContestQuestion]=useState<contestQuestions[]>([]);
        const [showLeaderBoardResult,setShowLeaderBoardResult]=useState<LeaderBoard[]>([]);


  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/verdict/join/${contestId}`,
          { withCredentials: true }
        );

        if (res.data.message === "contest is live") {
          setData(res.data.data);
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;

        if (error.response?.status === 401) {
          navigate(`/SignInPage?redirect=/verdict/join/${contestId}`);
        } else {
          alert(error.response?.data?.message || "contest not found");
        }
      }
    };

    fetchContest();
  },);





  if (!data) return <h2>Loading contest...</h2>;


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
navigate('/CodeVerdictContestQuestion', {state: {harshw: {...all,contestId: contestId,joinNow:data,
    }
  }
});
}



const showLeaderBoard=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const send={contestId:contestId};
    try{
        const response=await axios.post('http://localhost:5000/api/submit/showCodeVerdictLeaderBoard',send,{withCredentials:true});
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


  return (
    <>
      <h1>CodeVerdict Contest Live</h1>

      <p><b>Contest ID:</b> {data._id}</p>
      <p><b>Name:</b> {data.name}</p>
      <p><b>Organizer:</b> {data.gmail}</p>
      <p><b>Instructions:</b> {data.instructions}</p>

      <p> <b>Date:</b>{" "}{new Date(data.organizingDate).toLocaleDateString()}</p>
      <p><b>Start:</b>{" "}{new Date(data.startingTimeOfContest).toLocaleTimeString()}</p>
      <p><b>End:</b>{" "}{new Date(data.endingTimeOfContest).toLocaleTimeString()}</p>
      <h3>Questions</h3>      
         <button onClick={showQuestions}>See All Questions</button>
         <button onClick={showLeaderBoard}>LeaderBoard</button>


         
        {
            contestQuestion.map((all,index)=>(
                <div  className="problem-card" key={index}>
                    <span className="problem-number"> {index + 1}.</span>
                    <button  onClick={()=>handleTitle(all)}>{all?.title}</button>
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
