import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { goToSubMenu, goToMainMenu } from "../../app/slices/navBarSlice.ts";
import { setFilteredList } from "../../app/slices/productsListSlice.ts";
import rightArrow from "../../assets/images/rightArrow.png";
import ms from "./style.module.scss";

export const LocationMenu = () => {
  const loc = useLocation();
  const currentPage = loc.pathname.split("/")[1];
  const currentCategory = loc.pathname.split("/")[2];
  const subCategory = loc.pathname.split("/")[4];
  const productsList = useSelector((s) => s.productsList.productsList);

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
    if (currentPage && !currentCategory)
      dispatch(setFilteredList(productsList));
    else if (currentCategory && !subCategory) {
      dispatch(
        setFilteredList(
          productsList.filter(
            (el) =>
              String(el.category).toLowerCase() ===
              currentCategory.toLowerCase()
          )
        )
      );
    } else if (subCategory) {
      dispatch(
        setFilteredList(
          productsList.filter(
            (el) =>
              String(el.subCategory).toLowerCase() ===
              String(subCategory).toLowerCase()
          )
        )
      );
    }
  };

  return (
    <section className={ms.container}>
      <ul className={ms.container__list}>
        <Link to={"/" + currentPage}>
          <li
            onClick={() => {
              nav("/" + currentPage);
              dispatch(goToMainMenu());
              makeFilter();
            }}
            className={ms.container__list__item}
          >
            <span style={{ textTransform: "capitalize" }}>{currentPage} </span>
            {currentCategory ? <img src={rightArrow} /> : null}
          </li>
        </Link>
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
        <li className={ms.container__list__item} onClick={makeFilter}>
          {subCategory}
        </li>
      </ul>
    </section>
  );
};
