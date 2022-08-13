import React, { useEffect ,useState} from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import ms from "./style.module.scss";
import { FavoriteList } from "../../components/FavoriteList/index.tsx";
import { LocationMenu } from "../../components/LocationMenu/index.tsx";
import { ToolsPanel } from "../../components/ToolsPanel/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { FilteredList } from "../../components/FilteredList/index.tsx";
import { FilterMenu } from "../../components/FilterMenu/index.tsx";
import jwt_decode from "jwt-decode";
import { getFavorListThunk } from "../../app/slices/productsListSlice.ts";

export const Favorite = () => {
  const favFilterList = useSelector((s) => s.productsList.favorFilterList);
  const favorList = useSelector((s) => s.productsList.favoriteList);
  const loading = useSelector(s=>s.productsList.loading);
  const user = useSelector(s=>s.user.userData);
  const [stateFavor,setFavor]=useState();
  const dispatch = useDispatch();
  const isAuth = useSelector(s=>s.user.isAuth)

  useEffect(() => {
    
    if (localStorage.getItem("token")) {
       const userId = jwt_decode(localStorage.getItem("token")).id;
       dispatch(getFavorListThunk(userId));
    }
  }, []);

  return (
    
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <FilterMenu />
          <section className={ms.container__field__content}>
            <ToolsPanel />
            
            {/* {favFilterList.length>0?<FilteredList filterList={favFilterList}/> : 'No such product  !!'} */}
           {isAuth?
            <>
            {favorList.length > 0 ? (
              <FilteredList filterList={favorList} />
            ) :loading==='pending'?
            <>Loading...</> :(
              "No such product  !!"
            )}
            </>:
            <h2>For favorites need authorization !</h2>
            }
          </section>
        </section>
      </section>
      <Footer />
    </>
   
  );
};
