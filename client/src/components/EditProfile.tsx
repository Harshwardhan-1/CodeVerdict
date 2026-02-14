import { useEffect, useState } from "react";
import axios from "axios";
import "./EditProfile.css";

export default function EditProfile() {
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
        alert("Profile saved successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="editProfilePage">
      <h1 className="title">Edit Profile</h1>

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
        <select value={gender || ""} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={dateOfBirth || ""}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github link"
          value={githubLink || ""}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="LinkedIn link"
          value={linkedinLink || ""}
          onChange={(e) => setLinkedinLink(e.target.value)}
        />

        <button className="submitBtn" type="submit">
          {data ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
}