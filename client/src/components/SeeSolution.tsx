import { useLocation } from "react-router-dom";
import './SeeSolution.css';
export default function SeeSolution(){
    interface seeSolution{
        name:string,
        problemTitle:string,
        userCode:string,
        approach:string,
        date:Date,
    }
    const location=useLocation();
    const harsh=location.state?.ra as seeSolution[];    
    return(
        <>
        <div className="see-container">
        <h1>This Are The List Of Submission</h1>
        {
            harsh.map((all,index)=>(
                <div className="submission-card" key={index}>
                    <p>Name:{all?.name}</p>
                    <p>Problem Name:{all?.problemTitle}</p>
                    <p>Date Of Submission{new Date(all?.date).toLocaleDateString()}</p>
                    <p>Approach:{all?.approach}</p>
                    <pre className="code-box"> <code>{all.userCode}</code></pre>
                </div>
            ))
        }
        </div>
        </>
    );
}