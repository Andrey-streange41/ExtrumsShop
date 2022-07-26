import React from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import ms from "./style.module.scss";
import { FavoriteList } from "../../components/FavoriteList/index.tsx";
import { LocationMenu } from "../../components/LocationMenu/index.tsx";
import { ToolsPanel } from "../../components/ToolsPanel/index.tsx";
import { useSelector } from "react-redux";


export const Favorite = () => {

const favFilterList = useSelector(s=>s.productsList.favoriteList);

  return (
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <section className={ms.container__field__content}>
            <LocationMenu />
            <ToolsPanel />
            
            <FavoriteList />
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};
