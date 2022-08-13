import React, { useEffect,useState } from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import { LocationMenu } from "../../components/LocationMenu/index.tsx";
import ms from "./style.module.scss";
import { ToolsPanel } from "../../components/ToolsPanel/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { FilteredList } from "../../components/FilteredList/index.tsx";
import { FilterMenu } from "../../components/FilterMenu/index.tsx";
import { getFavorListThunk } from "../../app/slices/productsListSlice.ts";
import jwt_decode from "jwt-decode";

export const Catalog = () => {
  const filteredList = useSelector((s) => s.productsList.filteredList);
  const testList = useSelector((s) => s.productsList.testList);
  const dispatch = useDispatch();
  const [list,setList]=useState([]);
  const user = useSelector(s=>s.user.userData);
    
  useEffect(()=>{
   setList(testList)
   
   
   
  },[user,testList])
 

  return (
    <>
      <section className={ms.container}>
        <Header />

        <section className={ms.container__field}>
          <NavBar />
          <FilterMenu />
          <section className={ms.container__field__content}>
            <LocationMenu />
            <ToolsPanel />
            {/* {!filteredList.length ? "No such category !":<FilteredList filterList={filteredList}/>} */}
            {!list.length ? (
              "No such category !"
            ) : (
              <FilteredList filterList={list} />
            )}
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
};
