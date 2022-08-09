import React, { FC, useState } from "react";
import ms from "./style.module.css";
import signin from "../../assets/images/signin.png";
import { Input } from "../UI/Input/Input.tsx";
import { CheckBox } from "../UI/CheckBox/CheckBox.tsx";
import { Button, OutlineButton } from "../UI/Button/index.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../http/userAPI.ts";
import { setAuth ,setRemember} from "../../app/slices/userSlice.ts";
import * as yup from "yup";
import { IError } from "../../pages/AccountInfo.tsx";
import jwt_decode from 'jwt-decode';
import {getUserByIdChunck} from '../../app/slices/userSlice.ts'
import { updateUser,setUserData } from "../../app/slices/userSlice.ts";

let schema = yup.object().shape({
  email: yup.string().email().required().max(40),
  password: yup.string().required().min(6),
});



export const LoginMenu: FC = () => {

  const [errors, setErrors] = useState <IError>([
    { name: "email", error: true, message: "" },
    { name: "password", error: false, message: "" },
  ]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((s) => s.user.userData);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setUser({ ...user, rememberMe: !user.rememberMe });
  };

  const resetError = () => {
    const buffer: IError[] = errors.map((el) => {
      if (el.name === "password") {
        el.message = null;
        el.error = false;
      }
      return el;
    });
    setErrors(buffer);
    const buffer2: IError[] = errors.map((el) => {
      if (el.name === "email") {
        el.message = null;
        el.error = false;
      }
      return el;
    });
  }

  const signIn = async () => {
    try {
      const result = await schema.validate(user);
      resetError();
      if(result){
        const responce = await login(user.email, user.password);     
        if(responce==='error!')
        {
          const buffer: IError[] = errors.map((el) => {
            if (el.name === "password"||el.name ==='email') {
              el.message = 'uncorrect password or email !';
              el.error = true;
            }
            return el;
          });
          setErrors(buffer);
          return;
        }
      dispatch(setRemember(user.rememberMe));
      dispatch(setAuth(true));
      dispatch(getUserByIdChunck(jwt_decode(localStorage.getItem('token')).id)); // save user data to store 
      nav('/account');
      }
    } catch (err) {
     
      resetError();
      if (String(err.message).includes("password")) {
        const buffer: IError[] = errors.map((el) => {
          if (el.name === "password") {
            el.message = err.message;
            el.error = true;
          }
          return el;
        });
        setErrors(buffer);
      } else if (String(err.message).includes("email")) {
        const buffer: IError[] = errors.map((el) => {
          if (el.name === "email") {
            el.message = err.message;
            el.error = true;
          }
          return el;
        });
        setErrors(buffer);
      } 
      return err.message;
    }
  };



 

  return (
    <div className={ms.container}>
      <img className={ms.container__signin} src={signin} alt="" />
      <Input
         error={errors.find((el) => el.name === "email")}
        handleChange={handleChange}
        value={user.email}
        name={"email"}
        type={"email"}
        label={"Email address or mobile phone number"}
      />
      <Input
         error={errors.find((el) => el.name === "password")}
        handleChange={handleChange}
        value={user.password}
        name={"password"}
        type={"password"}
        label={"Password"}
      />
   
        <CheckBox
          label={"Remember me"}
          isActive={user.rememberMe}
          handleClick={handleClick}
        />
        
     
      
      <Button handleSubmit={signIn} width={460} text={"Continue"} />
      <section className={ms.container__borders_section}>
        <div className={ms.border}></div>
        <span>Don't have an account yet?</span>
        <div className={ms.border}></div>
      </section>

      <Link to={"/registration"} style={{ textDecoration: "none" }}>
        <section className={ms.buttWrapper}>
               <OutlineButton width={460} text={"Create your Best Product account"} />
        </section>
   
      </Link>
       
    </div>
  );
};
