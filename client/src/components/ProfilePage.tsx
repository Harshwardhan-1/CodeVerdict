import axios, { AxiosError } from "axios";
import { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CalendarHeatMap from "react-calendar-heatmap";
import { motion } from "framer-motion";
import Swal from "sweetalert2";


interface Submission {
    title: string;
    description: string;
    userCode: string;
}

interface AllPoints {
    title: string;
    points: string;
}

interface discuss{
problemTitle:string,
userCode:string,
approach:string,
}

interface profile{
    totalQuestion:number,
     totalEasyQuestion:number,
     totalMediumQuestion:number,
     totalHardQuestion:number,
     totalSolvedEasyQuestion:number,
     totalSolvedMediumQuestion:number,
     totalSolvedHardQuestion:number,
     totalSolvedCount:number,
}
type Section = "submission" | "points" | "discussion" | null;
interface profileName{
    name:string,
    gmail:string,
}

interface HeatmapData{
    date:string,
    count:number,
}



export default function ProfilePage() {
    const currentYear = new Date().getFullYear();
const [year, setYear] = useState(currentYear);

   useEffect(()=>{
  const fetch=async()=>{
    const res=await axios.get(`http://localhost:5000/api/submit/heatMap?year=${year}`,{ withCredentials: true });
    setHeatmap(res.data.data);
  };

  fetch();
},[year]);
const [profilename,setName]=useState<profileName>();
const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/add/new/profile',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setName(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'something went wrong'){
                    alert('name not found');
                }else{
                    console.log(err);
                }
            }
        };
        fetch();
    },[]);
    const navigate=useNavigate();
    const [profileData,setProfileData]=useState<profile>();
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/newQuestion/getQuestionCount',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setProfileData(response.data.data);
                    
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                console.log(error);
            }
        };
        fetch();
    },[]);






const [preview, setPreview]=useState<string>("");
useEffect(()=>{
   const fetch=async()=>{
    try{
        const response=await axios.get('http://localhost:5000/api/profile/showProfile',{withCredentials:true});
        if(response.data.message=== 'successfull'){
            const d=response.data.data;
            if(d.profilePhoto){
                setPreview(`http://localhost:5000/uploads/${d.profilePhoto}`);
            }  
        }
    }catch(err){
        console.log(err);
    }
   };
   fetch();
},[]);

interface batch{
    name:string,
    gmail:string,
    imageBatch:string,
    batchCount:number,
}

const [batchImage,setBatchImage]=useState<batch[]>([]);

useEffect(()=>{
    const fetch=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/batch/getBatch',{withCredentials:true});
            if(response.data.message=== 'successfull'){
                setBatchImage(response.data.data);
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>;
            if(error.response?.data?.message=== 'no btches'){
                alert('no batches');
            }
        }
    };
    fetch();
},[]);











    interface ActiveDays{
        gmail:string,
        totalactiveDays:number,
    }
    const [activeDays,setActiveDays]=useState<ActiveDays>({
        gmail:'',
        totalactiveDays:0,
    });

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/submit/activeDays',{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setActiveDays(response.data.data);
                    if(response.data.data.alert){
                        alert(response.data.data.alert);
                    }
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'no active dys'){
                    alert('no active days');
                }
            }
        };
        fetch();
    },[]);



interface MaxStreak{
    maxStreak:number;
}

const [maxstreak,setMaxStreak]=useState<MaxStreak>({
    maxStreak:0
});


interface questionSolved{
    languageCplusplus:number,
    python:number,
    java:number,
}

const [language,setLanguage]=useState<questionSolved>({
    languageCplusplus:0,
    python:0,
    java:0,
});


useEffect(()=>{
const fetch=async()=>{
try{
    const response=await axios.get('http://localhost:5000/api/submit/checklanguage',{withCredentials:true});
    if(response.data.message=== 'successfull'){
        setLanguage(response.data.data);
    }
}catch(err){
    console.log(err);
}
};
fetch();
},[]);




useEffect(()=>{
    const fetch=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/submit/checkStreak',{withCredentials:true});
            if(response.data.message=== 'successfull'){
                setMaxStreak(response.data.data);
            }
        }catch(err){
            console.log(err);
        }
    };
    fetch();
},[])


// interface totalBatch{
//     gmail:string,
//     batch:number,
// }

// const [totalBatchCount,setTotalBatchCount]=useState<totalBatch>();
const [count,setCount]=useState<number>(0);
useEffect(()=>{
    const fetch=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/batch/getBatchCount',{withCredentials:true});
            if(response.data.message=== 'successfull'){
                const user=response.data.data;
                if(user.totalBatches>0){
                    setCount(user.totalBatches);
                }
            }
        }catch(err){
            console.log(err);
        }
    };
    fetch();
},[]);




















    const [data, setData] = useState<Submission[]>([]);
    const [dataPoint, setDataPoint] = useState<AllPoints[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [discussion,setDiscussion]=useState<discuss[]>([]);
    const [activeSection, setActiveSection] = useState<Section>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmission = async () => {
        try {
            setLoading(true);
            setActiveSection("submission");
            const response = await axios.get("http://localhost:5000/api/submit/allSubmission",{ withCredentials: true });
            setData(response.data.data);
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            alert(error.response?.data?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    const handlePoints = async () => {
        try {
            setLoading(true);
            setActiveSection("points");
            const response = await axios.get("http://localhost:5000/api/submit/allPoints", { withCredentials: true });
            const pointsData: AllPoints[] = response.data.data;
            setDataPoint(pointsData);

            const total = pointsData.reduce(  (sum, item) => sum + Number(item.points), 0);
            setTotalPoints(total);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };



    const handleDiscussion=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
         try{
            setLoading(true);
            setActiveSection("discussion");
                const response=await axios.get('http://localhost:5000/api/discuss/allDiscussions',{withCredentials:true});
                if(response.data.message=== 'successfully got'){
                    setDiscussion(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError<{message:string}>
                if(error.response?.data?.message=== 'no submission yet'){
                    alert('no submission yet');
                }
            }finally{
                setLoading(false);
            }
    }
const percent=profileData ?(profileData.totalSolvedCount/profileData.totalQuestion)* 100:0;



const handleAllSubmission=async(title:string)=>{
    const send={title};
    navigate('/SeeAllParticularSubmission',{state:{har:send}});
}


const logout=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try{
        const response=await axios.get('http://localhost:5000/add/new/logout',{withCredentials:true});
        if(response.data.message=== 'successfull'){
            navigate('/SignInPage');
        }
    }catch(err){
        const error=err as AxiosError<{message:string}>
        if(error.response?.data?.message=== 'something went wrong'){
            alert('something went wrong');
        }
    }
}

const handleEdit=async()=>{
    navigate('/EditProfile');
}
    return (
        <>
        <header className="headeraaa">
   <div className="header-left">
    <span onClick={()=>navigate('/HomePage')}  className="header-item">CodeVerdict</span>
  </div>
    <div className="header-center">
    <span onClick={()=>navigate('/HomePage')} className="header-item">Home</span>
    <span onClick={()=>navigate('/ProblemPage')} className="header-item">Problems</span>
    <span onClick={()=>navigate('/ContestPage')} className="header-item">Contest</span>
    <span onClick={()=>Swal.fire({
           icon: "info",
        title: "Leaderboard",
        text: "Leaderboard will be added soon",
        timer: 1000,
        showConfirmButton: false,
        background: "#0b1b2b",
        color: "#e2e8f0",
        })} className="header-item">Leaderboard</span>
  </div>
  <div className="header-right">
    <span onClick={()=>navigate('/ProfilePage')} className="header-item">Profile</span>
  </div>
     </header>
        <div className="profile-layout">
            <aside className="sidebar">
                 <img src={preview ||"https://cdn-icons-png.flaticon.com/512/149/149071.png"}  className="avatar"/>
                <h2 className="logo">{profilename?.name}</h2>
                <button onClick={handleEdit} className="edit">Edit Profile</button>
                <button className={activeSection === "submission" ? "active" : ""} onClick={handleSubmission}>
                    My Submissions
                </button>

                <button className={activeSection === "points" ? "active" : ""}onClick={handlePoints}>My Points</button>
                <button onClick={handleDiscussion}>My Discussions</button>
                
                <button onClick={logout} className="logout">Logout</button>
            </aside>

             <main className="content">
                
                {loading && <p className="loading">Loading...</p>}
                {profileData && (
<div className="leetcode-stats">

    <div className="circle-wrapper">
        <div className="progress-ring"style={{  background: `conic-gradient(#00c853 ${percent}%, #2a2a2a ${percent}%)`}}>
            <span className="ring-text">
                {profileData?.totalSolvedCount}/{profileData?.totalQuestion}
            </span>
        </div>
        <p className="ring-label">Total Solved</p>
    </div>

    <div className="difficulty-list">
        <div className="diff easy">
            <span>Easy</span>
            <span>
                {profileData?.totalSolvedEasyQuestion}/{profileData?.totalEasyQuestion}
            </span>
        </div>

        <div className="diff medium">
            <span>Medium</span>
            <span>
                {profileData?.totalSolvedMediumQuestion}/{profileData?.totalMediumQuestion}
            </span>
        </div>

        <div className="diff hard">
            <span>Hard</span>
            <span>
                {profileData?.totalSolvedHardQuestion}/{profileData?.totalHardQuestion}
            </span>
        </div>
    </div>
</div>

)}









  {language.languageCplusplus>0 && (
    <p>C++:{language?.languageCplusplus}problem solved</p>
  )}


  {language.java>0 &&(
    <p>java:{language?.java}problem solved</p>
  )}

   {language.python>0 && (
    <p>python:{language?.python}problem solved</p>
   )}

              </main>
            <div>
            </div>
        </div>
<motion.div className="heatmap-section"
initial={{y:50,opacity:0}}
whileInView={{y:0,opacity:1}}
transition={{duration:0.8,ease:"easeOut"}}
viewport={{once:true,amount:0.2}}
>
  <div className="heatmap-header">
    <h3>{heatmap.reduce((sum, d) => sum + d.count, 0)} submissions this year</h3>
    <div className="heatmap-stats">
      <span>Total Active Days: {activeDays?.totalactiveDays}</span>
      <span>Max Streak: {maxstreak?.maxStreak}</span>
    </div>
  </div>

  <div className="year-controls">
    <button onClick={()=>setYear(year - 1)}>Prev</button>
    <span className="year-text">{year}</span>
    <button onClick={()=>setYear(year + 1)}>Next</button>
  </div>

  <CalendarHeatMap
    startDate={new Date(`${year}-01-01`)}
    endDate={new Date(`${year}-12-31`)}
    values={heatmap}
    gutterSize={4}
    classForValue={(v) => {
      if (!v || v.count === 0) return "color-empty";
      if (v.count >= 4) return "color-4";
      if (v.count === 3) return "color-3";
      if (v.count === 2) return "color-2";
      return "color-1";
    }}
    titleForValue={(v) => {
      if (!v) return "No submissions on this day";
      return `${v.count} submission${v.count > 1 ? "s" : ""} on ${v.date}`;
    }}
  />
</motion.div>

{console.log(count)}

{
    batchImage.map((all,index)=>(
        <div key={index}>
            <img src={`http://localhost:5000/Batchuploads/${all?.imageBatch}`} alt="" />
        </div>
    ))
}
 {activeSection === "points" && !loading && (
                    <>
                        <div className="points-box">
                            Total Points: <span>{totalPoints}</span>
                        </div>

                        {dataPoint.map((item, index) => (
                            <div className="card" key={index}>
                                <p><strong>Question:</strong> {item.title}</p>
                                <p><strong>Points:</strong> {item.points}</p>
                            </div>
                        ))}
                    </>
                )}


                {activeSection === "discussion" && !loading && (
                    <>
                        <h2>My Discussion</h2>
                        {discussion.map((item, index) => (
                            <div className="card" key={index}>
                                <h3>{item.problemTitle}</h3>
                                <pre>{item.userCode}</pre>
                                <p>{item.approach}</p>
                            </div>
                        ))}
                    </>
                )}
                {activeSection === "submission" && !loading && (
                    <>
                        <h2>My Submissions</h2>
                        {data.map((item, index) => (
                            <div className="card" key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <pre>{item.userCode}</pre>
                                <button onClick={()=>handleAllSubmission(item?.title)} className="submit-btn">See All Submission of this question</button>
                            </div>
                        ))}
                    </>
                )}

</>
    );
}
