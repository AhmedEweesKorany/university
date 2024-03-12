import React, { ChangeEventHandler, useContext, useState } from "react";
import { Wrapper } from "./styles";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import MyContext from "@/Context/Context";
import  { jwtDecode } from "jwt-decode"
import { match } from "assert";


function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [email,setEmail] =useState("")
  const [name,setName] = useState("")
  const {data,setData} = useContext(MyContext)
  console.log("data is ",data)
  const router = useRouter()
  
  
  const showSignIn =  () => {
    setIsSignUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4010/api/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token",res.data.data.accessToken)
      setData(jwtDecode(localStorage.getItem("token")));
      Swal.fire({
        title: "Successful login!",
        icon: "success"
      });
      router.push("/")

    } catch (error) {
      Swal.fire({
        title: error.response.data.err    ,
        icon: "error"
      });
    }
  };
  
 const handleCreate = async (e)=>{
  e.preventDefault()

  try {
    if(!password||!email|| !name ){
      return Swal.fire({
        title: "please compelte empty feilds!",
        icon: "error"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return Swal.fire({
        title: "invalid email!",
        icon: "error"
      });
    }
    if(password.length < 6){
      return Swal.fire({
        title: "password should be at least 6 chars",
        icon: "error"
      });
    }
    const res = await axios.post("http://localhost:4010/adduser", {
      email: email,
      username:name,
      password: password,
    });

    Swal.fire({
      title: "Successful registration!",
      icon: "success"
    });
    setEmail("")
    setName("")
    setPassword("")

  } catch (error) {
    Swal.fire({
      title: error.response.data.err    ,
      icon: "error"
    });
  }
 }
  const showSignUp = () => {
    setIsSignUp(true);
  };


  const onChangeConfirmPass: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === password || e.target.value.length < 6) {
      e.target.setCustomValidity("");
    } else { 
      e.target.setCustomValidity("Passwords do not match");
    }
  };

  return (
    <Wrapper>
 <div className={`container ${isSignUp ? "signup-active" : ""}`} id="container">
        <div className="form-container sign-up-container">
          <form >
            <h1>Create Account</h1>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="pigeon@nestcoop.com" required onChange={e=>setEmail(e.target.value)} value={email}  />

            <label htmlFor="username">username</label>
            <input type="text" minLength={6} required placeholder="enter your name" onChange={(e)=>{
              setName(e.target.value)
            }} value={name} />
            <label htmlFor="password">Password</label>
            <input
  type="password"
  minLength={6}
  placeholder="******"
  required
  onChange={(e)=>{
    setPassword(e.target.value)
  }}
  value={password}
  // Change setPassworđ to setPassword
/>


            <button type="submit" onClick={handleCreate}>Create</button>

            <span className="link" onClick={showSignIn}>
              Already have an account?
            </span>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="pigeon@nestcoop.com" required onChange={(e)=>{
              setEmail(e.target.value)
            }} />

            <label htmlFor="password">Password</label>
            <input type="password" minLength={6} placeholder="******" required onChange={(e)=>setPassword(e.target.value)}/>

            <button type="submit">Login</button>

            <span className="link" onClick={showSignUp}>
              Create account
            </span>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="title">Lets get you started</div>
              <p>Be part of out awesome team and have fun with us</p>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="title">Hello There</div>
              <p>Don't have an account?</p>
              <p>Sign up with us today!</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;