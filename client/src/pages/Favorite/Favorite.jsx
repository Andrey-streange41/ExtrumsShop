import React from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import ms from "./style.module.scss";
import { FavoriteList } from "../../components/FavoriteList/index.tsx";
import { LocationMenu } from "../../components/LocationMenu/index.tsx";
import { ToolsPanel } from "../../components/ToolsPanel/index.tsx";
import { useSelector } from "react-redux";
import { FilteredList } from "../../components/FilteredList/index.tsx";
import {FilterMenu} from '../../components/FilterMenu/index.tsx';


export const Favorite = () => {

const favFilterList = useSelector(s=>s.productsList.favorFilterList);
const favorList = useSelector(s=>s.productsList.favoriteList);

  return (
    <>
      <section className={ms.container}>
        <Header />
        <section className={ms.container__field}>
          <NavBar />
          <FilterMenu/>
          <section className={ms.container__field__content}>
            <ToolsPanel />
            {favFilterList.length>0?<FilteredList filterList={favFilterList}/> : 'No such product  !!'}
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};
