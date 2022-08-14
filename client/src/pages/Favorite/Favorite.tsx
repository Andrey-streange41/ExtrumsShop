import React from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import ms from "./style.module.scss";
import { ToolsPanel } from "../../components/ToolsPanel/index.tsx";
import { FilteredList } from "../../components/FilteredList/index.tsx";
import { FilterMenu } from "../../components/FilterMenu/index.tsx";
import Loader from "../../components/Loader/index.tsx";
import { useSelector } from "react-redux";

export const Favorite = () => {
  const favorList = useSelector((s) => s.productsList.favoriteList);
  const loading = useSelector(s=>s.productsList.loading);
  const isAuth = useSelector(s=>s.user.isAuth)


  return (
    loading==='pending'?
    <Loader />
    :
    loading==='failed'
    ?
    <h1>Ups sumsing was wrong ...</h1>
    :
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <FilterMenu />
          <section className={ms.container__field__content}>
            <ToolsPanel />
            {
              isAuth 
              ?
                (
                  <FilteredList filterList={favorList} />
                ) 
              :
              favorList.length<0?
              <h1>Empty... </h1>
              :
              <h2>For favorites need authorization !</h2>
            }
          </section>
        </section>
      </section>
      <Footer />
    </>
   
  );
};
