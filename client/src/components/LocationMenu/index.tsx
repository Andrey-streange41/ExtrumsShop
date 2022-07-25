import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { goToSubMenu, goToMainMenu } from "../../app/slices/navBarSlice.ts";
import rightArrow from "../../assets/images/rightArrow.png";
import ms from "./style.module.scss";

export const LocationMenu = () => {
  const subMenu = useSelector((s) => s.navBar.subMenu);
  const activeModalItem=
    subMenu[subMenu.findIndex((el) => el.isActive)]?.modalItems?.items[
      subMenu[
        subMenu.findIndex((el) => el.isActive)
      ]?.modalItems?.items.findIndex((el) => el.isActive)
    ]?.category;

  const loc = useLocation();
  const currentPage = loc.pathname.substring(
    1,
    loc.pathname.indexOf("/", 1) > 0
      ? loc.pathname.indexOf("/", 1)
      : loc.pathname.length
  );

  useEffect(()=>{
  
  if(activeModalItem)
   { nav(
      "/" +
        currentPage +
        "/" +
        subMenu[subMenu.findIndex((el) => el.isActive)]?.text + '/subcategory/'+ activeModalItem
    );}
  },[activeModalItem])

  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <section className={ms.container}>
      <ul className={ms.container__list}>
        <Link to={"/" + currentPage}>
          <li
            onClick={() => {
              nav("/" + currentPage);
              dispatch(goToMainMenu());
            }}
            className={ms.container__list__item}
          >
            <span style={{ textTransform: "capitalize" }}>{currentPage} </span>
            {subMenu.find((i) => i.isActive) ? <img src={rightArrow} /> : null}
          </li>
        </Link>
        <li
          className={ms.container__list__item}
          onClick={() => {
            nav(
              "/" +
                currentPage +
                "/" +
                subMenu[subMenu.findIndex((el) => el.isActive)]?.text
            );
            dispatch(goToSubMenu());
          }}
        >
          <span>{subMenu[subMenu.findIndex((el) => el.isActive)]?.text}</span>
          {subMenu[
            subMenu.findIndex((el) => el.isActive)
          ]?.modalItems.items.findIndex((i) => i.isActive) >= 0 ? (
            <img src={rightArrow} />
          ) : null}
        </li>
        <li className={ms.container__list__item}>{activeModalItem}</li>
      </ul>
    </section>
  );
};
