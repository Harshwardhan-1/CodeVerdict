    import {useState} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './SignInPage.css';
export default function SignInPage(){
    const location=useLocation();
    const navigate=useNavigate();
    const [gmail,setGmail]=useState('');
    const [password,setPassword]=useState('');
    const handle=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const send={gmail,password};
        try{
            const response=await axios.post('http://localhost:5000/add/new/SignIn',send,{withCredentials:true});
            if(response.data.message=== 'login successfully'){
                const user=response.data.data;
                 const redirectPath =new URLSearchParams(location.search).get("redirect");
                if(user?.role=== 'ADMIN'){
                    navigate('/AdminPage');
                    return;
                }
                if(redirectPath){
                    navigate(redirectPath);
                }
                else if(user?.role=== 'STUDENT'){
                    navigate('/HomePage');
                }
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>;
            if(error.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'gmail not found'){
                alert('gmail not found');
                navigate('/');
            }else if(error.response?.data?.message=== 'something went wrong'){
                alert('something went wrong');
            }
        }
    }
    return(
        <>
        <div className="signin-page">
        <h1>Welcone To login Page</h1>
        <form onSubmit={handle}>
          <input type="email" placeholder='Enter your email here' value={gmail} onChange={(e)=>setGmail(e.target.value)}/>
          <input type="password" placeholder='Enter your password here' value={password} onChange={(e)=>setPassword(e.target.value)} />
              <button type='submit'>Submit</button>
              <div className="signup-link">
          Don't have an account?{" "}
          <Link to="/">Create account</Link>
        </div>
            </form> 
        </div>
        </>
    );
}