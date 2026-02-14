import {useState} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUpPage.css'
export default function SignUpPage(){
    const navigate=useNavigate();
    const [name,setName]=useState<string>('');
    const [gmail,setGmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');


    const handle=async(e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const send={name,gmail,password};
        try{
            const response=await axios.post('http://localhost:5000/add/new/addNew',send,{withCredentials:true});
            if(response.data.message=== 'succesfully created'){
                navigate('/SignInPage');
            }
        }catch(err){
            const error=err as AxiosError<{message:string}>;
            if(error.response?.data?.message=== 'fill form properly'){
                alert('provide proper detail');
            }else if(error.response?.data?.message=== 'gmail already exist'){
                alert('gmail already exist');
            }else if(error.response?.data?.message=== 'name must be of 3 characters'){
                alert('name must be of 3 characters');
            }
        }
    }

    return(
        <>
          <div className="signup-page">
        <h1>Welcome To SignUpPage</h1>
        <form onSubmit={handle}>
          <input type="text" placeholder='Enter your name here' value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="email" placeholder='Enter your email here' value={gmail} onChange={(e)=>setGmail(e.target.value)}  />
          <input type="password" placeholder='Enter your password here' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type='submit'>Submit</button>
          <div className="signin-link">
    Already have an account?{" "}
    <Link to="/SignInPage">Sign In</Link>
  </div>
        </form>
        </div>
        </>
    );
}