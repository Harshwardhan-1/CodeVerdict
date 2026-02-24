import {useState} from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

export default function SignUpPage(){
    const navigate=useNavigate();
    const [name,setName]=useState<string>('');
    const [userName,setUserName]=useState<string>('');
    const [gmail,setGmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');


    const handle=async(e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const send={name,userName,gmail,password,confirmPassword};
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
            }else if(error.response?.data?.message=== 'password and confirm password dont match'){
                alert('password and confirm password dont match');
            }
        }
    }

    return(
        <>
          <div className="signup-page-wrapper">
          <div className="signup-page">
        <h1>Create an Account</h1>
        <p>Get Started with us</p>
        <form onSubmit={handle}>
               <label>Name</label>
          <input type="text" placeholder='Enter your Name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <label>Username</label>
          <input type="text" placeholder='Enter your username' value={userName} onChange={(e)=>setUserName(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder='Enter your email ' value={gmail} onChange={(e)=>setGmail(e.target.value)}  />
         <label>password</label>
          <input type="password" placeholder='Create a password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type="password"  placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <button type='submit'>Submit</button>
          <div className="signin-link">
    Already have an account?{" "}
    <Link to="/SignInPage">Login</Link>
  </div>
        </form>
        </div>
        </div>
        </>
    );
}