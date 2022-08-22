import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation,  useNavigate } from "react-router-dom";
import { goToSubMenu, goToMainMenu } from "../../app/slices/navBarSlice.ts";
import {getProductsThunk} from '../../app/slices/productsListSlice.ts';

import rightArrow from "../../assets/images/rightArrow.png";
import ms from "./style.module.scss";

export const LocationMenu = () => {
  const loc = useLocation();
  const currentPage = loc.pathname.split("/")[1];
  const currentCategory = loc.pathname.split("/")[2];
  const subCategory = loc.pathname.split("/")[4];
  

  const memoizedCallback = useCallback(
    () => {
     makeFilter();
    },
    [loc],
  );
  useEffect(() => {
    makeFilter();
  }, [memoizedCallback]);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const makeFilter = () => {
   const query = {
     category: "",
   };
   query.category = currentCategory;
   dispatch(getProductsThunk(query));
  };

  return (
    <section className={ms.container}>
      <ul className={ms.container__list}>
        
          <li
            onClick={() => {
              nav("/" + currentPage);
              dispatch(goToMainMenu());
              dispatch(getProductsThunk());
            }}
            className={ms.container__list__item}
          >
            <span style={{ textTransform: "capitalize" }}>{currentPage} </span>
            {currentCategory ? <img src={rightArrow} /> : null}
          </li>
        
        <li
          className={ms.container__list__item}
          onClick={() => {
            nav("/" + currentPage + "/" + currentCategory);
            dispatch(goToSubMenu());
            makeFilter();
          }}
        >
          <span>{currentCategory}</span>
          {subCategory ? <img src={rightArrow} /> : null}
        </li>
        <li className={ms.container__list__item} onClick={
          ()=>{ }
        }>
          {subCategory}
        </li>
      </ul>
    </section>
  );
};
