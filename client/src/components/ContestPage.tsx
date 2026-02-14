import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";
export default function ContestPage(){
    const navigate=useNavigate();
    const handleVerdictContest=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/api/verdict/codeVerdict',{withCredentials:true});
            if(response.data.message=== 'successfull'){
                    navigate('/CodeVerdictContest')
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'gmail not found do sign up first'){
                alert('gmail not found do sign up first');
                navigate('/SignInPage');
            }else if(error.response?.data?.message=== 'contest will be added shortly check after some time'){
                alert('contest will be added shortly check after some time');
            }
        }
    }
    const handle=()=>{
        navigate('/OrganizeContest');
    }
    const seeContest=async()=>{
        navigate('/SeeAllContest');
    }
    return(
        <>
        <h1>Contest page</h1>
        <button type="button" onClick={handleVerdictContest}>CodeVerdict Contest</button>
        <button onClick={handle}>Organize your own contest</button>
        <button onClick={seeContest}>See All Your Contest</button>
        </>
    );
}