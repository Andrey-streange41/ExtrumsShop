import React, { ChangeEvent, FC, useEffect, useState } from "react";
import ms from "./style.module.scss";
import signup from "../../assets/images/signup.png";
import { Input } from "../UI/Input/Input.tsx";
import { CheckBox } from "../UI/CheckBox/CheckBox.tsx";
import { Button, OutlineButton } from "../UI/Button/index.tsx";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../../http/userAPI.ts";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../app/slices/userSlice.ts";
import { setUserData } from "../../app/slices/userSlice.ts";

export const RegistrationMenu: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((s) => s.user.userData);
  const [user, setUser] = useState({
    email: "",
    password: "",
    getUpdates: false,
    firstname: "",
    lastname: "",
    confirmPassword: "",
    avatar: null,
  });
  const [isActiveAdminMode,setAdminMode] = useState(false);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setUser({ ...user, getUpdates: !user.getUpdates });
  };


useEffect(()=>{
  setUser(userStore)
},[userStore])

  const signIn = async () => {

    try {
       const responce = await registration({
        email: user.email,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        role:isActiveAdminMode? "ADMIN" : "USER",
    });

    if(responce ==='error!') return ;
  
   
    
    if (responce) {
      dispatch(setAuth(true));
      dispatch(
        setUserData({
          ...userStore,
          email: responce.email,
          firstname: responce.firstname,
          lastname: responce.lastname,
          updateAgrements:user.getUpdates,
          password:user.password,
          id:responce.id
        })
      );
      nav("/account");
    }
    } catch (error) {
      alert(error.message)
    }
   
  };

  return (
    <div className={ms.container}>
      <img className={ms.container__signin} src={signup} alt="" />
      <Input
        error={null}
        handleChange={handleChange}
        value={user.firstname}
        name={"firstname"}
        type={"text"}
        label={"First Name"}
      />
      <Input
        error={null}
        handleChange={handleChange}
        value={user.lastname}
        name={"lastname"}
        type={"text"}
        label={"Last Name"}
      />
      <Input
        error={null}
        handleChange={handleChange}
        value={user.email}
        name={"email"}
        type={"email"}
        label={"Email address"}
      />
      <Input
        error={null}
        handleChange={handleChange}
        value={user.password}
        name={"password"}
        type={"password"}
        label={"Password"}
      />
      <Input
        error={null}
        handleChange={handleChange}
        value={user.confirmPassword}
        name={"confirmPassword"}
        type={"password"}
        label={"Confirm password"}
      />
      <section className={ms.checkboxes}>
         <CheckBox
        label={"Get updates on our shop news and promotions"}
        isActive={user.getUpdates}
        handleClick={handleClick}
      />
        <CheckBox
          label={"admin-mode"}
          isActive={isActiveAdminMode}
          handleClick={()=>{setAdminMode(!isActiveAdminMode)}}
        />
      </section>
     
      <Button width={460} text={"Continue"} handleSubmit={signIn} />
    </div>
  );
};
