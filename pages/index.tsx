import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StyledHome } from "../styles/Home.styled";
import { useUserContext, useUserUpdateContext } from "./ContextProvider";
import { useRouter } from "next/router";
import { StyledLogin } from "../styles/Login.styled";
import { PasswordStrengthMeter } from "./components/pwdBar";
import { InputField } from "./components/InputField";
import { ErrorMessage } from "./components/ErrorMessage";
import { DynamicButton } from "./components/DynamicButton";

const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const LogIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("")
  const [messagePwd, setMessagePwd] = useState("");
  const [messagePwdColor, setMessagePwdColor] = useState("")
  const [email, setEmail] = useState<string>("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState<string>("");
  const [invalidData, setInvalidData] = useState(false);
  const [screen, setScreen] = useState<number>(0);
  const setUser = useUserUpdateContext();
  const User = useUserContext();
  const router = useRouter();

  const setZero = ()=>{
    setMessage("");
    setPassword("");
    setUsername("");
    setEmail("");
    setRePassword("");
  }

  useEffect(()=>{if(rePassword!==""){
    if(rePassword!==password){
      setMessagePwd("Passwords don't match");
      setMessagePwdColor("red");}
    else if(rePassword===password){
      setMessagePwd("Passwords match");
      setMessagePwdColor("green");}
    }
    if(!validateEmail(email)&&email!=="")
    {
      setMessage("Email incorrect");
      setMessageColor("red");
    }
    else if(validateEmail(email)&&email!=="")
    { 
      setMessage("Email correct");
      setMessageColor("green");
    }
    },[rePassword, password, email])
 
    useEffect(()=>{
      console.log("Screen " + screen);
      if((screen==0&&(username===""||password===""))||(screen===2&&(username===""||password===""||rePassword!==password||(!validateEmail(email))))){
      setInvalidData(true);
    }
    else
      setInvalidData(false);
  }, [password, username, rePassword, email])


  useEffect(()=>{
      console.log(username);
  }, [username])

  useEffect(() => {
    if (User != null) {
      router.push("/home");
    }
  }, [User, router]);

  if (screen === 0)
    return (
      <StyledLogin>
        <div className="window">
        <div className="wrapper-login">
          <InputField inputName="Username" callbackFunction={setUsername}/>
          <InputField inputName="Password" callbackFunction={setPassword}/>
          <div className="buttons">
            <DynamicButton inputName="xd" greyOut={invalidData} callbackFunction={() => {
                var payload = { username: username, password: password };
                fetch("http://localhost:3001/login", {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  credentials: "include",
                  body: JSON.stringify(payload),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    console.log(response.message);
                    if (response.message == "Login succesful!") {
                      setUser(username);
                      setMessage('');
                    }
                    else{
                      setMessage('Login unsuccesful!');
                      setMessageColor('Red');
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}/>
            <ErrorMessage inputName={message} inputColor={messageColor}/>
            <div className="clickable-text"
              onClick={() => {
                setZero();
                setScreen(2);
              }}
            >
              Register new account
            </div>
          </div>
          <div className="message">{error}</div>
          <div></div>
          <div
            onClick={() => {
              fetch("http://localhost:3001/verifycookie", {
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include",
              })
                .then((res) => res.json())
                .then((response) => {
                  console.log("Cookie response.");
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Forgot your password?
          </div>
        </div>
        </div>
      </StyledLogin>
    );
  else if (screen === 2)
    return (
      <StyledLogin>
        <div className="window">
        <div className="wrapper-register">
          <div onClick={() => {setZero(); setScreen(0)}}>BACK</div>
          <div>Login</div>
          <InputField inputName="E-mail" callbackFunction={setEmail}/>
          <InputField inputName="Username" callbackFunction={setUsername}/>
          <InputField inputName="Password" callbackFunction={setPassword}/>
          <PasswordStrengthMeter password={password} />
          <InputField inputName="Repeat password" callbackFunction={setRePassword}/>
          <ErrorMessage inputName={messagePwd} inputColor={messagePwdColor}/>
          <ErrorMessage inputName={message} inputColor={messageColor}/>
          <div className="buttons">
            <DynamicButton inputName="Register" greyOut={invalidData} callbackFunction={()=>{ var payload = { username: username, password: password, email:email };
                fetch("http://localhost:3001/register", {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  credentials: "same-origin",
                  body: JSON.stringify(payload),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    setMessage(response.message);
                    setMessageColor("green");
                    if(response.message==="Username taken!"){
                      setMessageColor("red");
                    }
                    if(response.message==="Email taken!"){
                      setMessageColor("red");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });}}/>
          </div>
        </div>
        </div>
      </StyledLogin>
    );
};

export default LogIn;
