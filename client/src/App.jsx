import { Routes, Route } from "react-router-dom";
import "./assets/scss/style.scss";
import "./assets/scss/reset.css";
import { Home } from "./pages/Home/Home";
import { Favorite } from "./pages/Favorite/Favorite";
import { Catalog } from "./pages/Catalog/index.tsx";
import { Detail } from "./pages/Detail/index.tsx";
import { AccountInfo } from "./pages/AccountInfo/index.tsx";
import { Registration } from "./pages/Authorization/Registration.tsx";
import { Login } from "./pages/Authorization/Login.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {isAuth} from './http/userAPI.ts';
import {setAuth,setUserData} from './app/slices/userSlice.ts';
import jwt_decode from 'jwt-decode';
import {getUserById} from './http/userAPI.ts';
import { getUserByIdChunck } from "./app/slices/userSlice.ts";
import { Admin } from "./pages/Admin/index.tsx";
import { AddProduct } from "./pages/AddProduct/index.tsx";

function App() {
  
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
 useEffect(()=>{
    isAuth().then(() => {
      dispatch(setAuth(true));
    }).finally(()=>{
      setLoading(false);
    });
  
      if(localStorage.getItem('token'))
      {
        dispatch(getUserByIdChunck(jwt_decode(localStorage.getItem('token')).id));
      }
 },[]);



if(loading){
  return <section>Loading...</section>
}

  return (
    <div className="App">
      <Routes>
        <Route exact path="/catalog/:category/:id" element={<Detail />} />
        <Route exact path="/:page/:category/subcategory/:subcategory" element={<Catalog/>}/>
        <Route exact path="/favorites/:category/:id" element={<Detail />} />
        <Route exact path="/catalog/:category" element={<Catalog />} />
        <Route exact path="/catalog" element={<Catalog />} />
        <Route exact path="/favorites/:category" element={<Favorite />} />
        <Route exact path="/favorites" element={<Favorite />} />
        <Route exact path="/account" element={<AccountInfo/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/registration" element={<Registration/>}/>
        <Route exact path='/admin' element={<Admin/>}/>
        <Route exact path="/admin/addProduct" element={<AddProduct/>}/>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
