import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./EditProfile.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function EditProfile() {
  const navigate=useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  interface Profile {
    profilePhoto: string;
    gender: string;
    dateOfBirth: string;
    githubLink: string;
    linkedinLink: string;
  }

  const [data,setData]=useState<Profile | null>(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/showProfile",
          { withCredentials: true }
        );

        if (response.data.message === "successfull") {
          const d = response.data.data;

          setData(d);
          setGender(d.gender);
          setDateOfBirth(d.dateOfBirth?.slice(0, 10));
          setGithubLink(d.githubLink);
          setLinkedinLink(d.linkedinLink);

          if (d.profilePhoto) {
            setPreview(`http://localhost:5000/uploads/${d.profilePhoto}`);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

const [blurred,setIsBlurred]=useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (profilePhoto) formData.append("photo", profilePhoto);
    formData.append("gender", gender);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("githubLink", githubLink);
    formData.append("linkedinLink", linkedinLink);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile/makeProfile",
        formData,
        { withCredentials: true }
      );

      if (response.data.message === "successfull" ||response.data.message === "update successfull"){
        setIsBlurred(true);
        Swal.fire({
          icon:"success",
          text:"profile saved successfully",
          timer:1000,
          showConfirmButton: false,
          background: "#0b1b2b",
          color: "#e2e8f0",
        }).then(()=>{
          setIsBlurred(false);
        })
      } 
    } catch (err) {
      const error=err as AxiosError<{message:string}>
      if(error.response?.data?.message=== 'atleast provide one detail'){
        Swal.fire({
          icon:"error",
          title:"Atleast Provide one detail",
          timer:1000,
          showConfirmButton: false,
          background: "#0b1b2b",
          color: "#e2e8f0",
        })
      }
    }
  };
  return (
    <>
    <motion.header className="heer"
      >
   <div className="header-left">
    <span onClick={()=>navigate('/HomePage')}  className="header-item">CodeVerdict</span>
  </div>
    <div className="header-cent">
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
  <div className="header-righ">
    <span onClick={()=>navigate('/ProfilePage')} className="header-item">Profile</span>
  </div>
     </motion.header>
    <div className={`editProfilePage ${blurred?"blurred":""}`}>
      <h1 className="title">Profile</h1>

      <form className="profileForm" onSubmit={handleSubmit}>
        <label className="avatarWrapper">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="avatar"
          />

          <div className="overlay">Change</div>

          <input type="file" hidden onChange={handleFileChange} />
        </label>
        <label >Select Gender</label>
        <select value={gender || ""} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <label >Date Of Birth</label>
        <input
          type="date"
          value={dateOfBirth || ""}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label >Github Link</label>
        <input
          type="text"
          placeholder="www.example.com"
          value={githubLink || ""}
          onChange={(e) => setGithubLink(e.target.value)}
        />
        <label >Linkedin Link</label>
        <input
          type="text"
          placeholder="www.example.com"
          value={linkedinLink || ""}
          onChange={(e) => setLinkedinLink(e.target.value)}
        />

        <button className="submitBtn" type="submit">
          {data ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
    </>
  );
}