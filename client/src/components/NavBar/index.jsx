import React, { useEffect } from "react";
import ms from "./style.module.scss";
import { SubMenu } from "./SubMenu/index.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setNavBar } from "../../app/slices/navBarSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../app/slices/navBarSlice.ts";
import { setFilteredList } from "../../app/slices/productsListSlice.ts";
import { selectSubItem } from "../../app/slices/navBarSlice.ts";

export const NavBar = () => {
  const loc = useLocation();
  const dispatch = useDispatch();
  const items = useSelector((s) => s.navBar.items);

  useEffect(() => {
    if (localStorage.getItem("currentLocation"))
      dispatch(setActive(localStorage.getItem("currentLocation")));
  }, []);

  return (
    <section className={ms.container}>
      <ul className={ms.container__linkList}>
        {items.map((item, index) => (
          <MenuItem key={index} item={item} index={index} />
        ))}
      </ul>
      <section className={ms.container__subMenu}>
        <SubMenu />
      </section>
    </section>
  );
};

const MenuItem = ({ item, index }) => {
  const products = useSelector((s) => s.productsList.productsList);
  const subMenu = useSelector((s) => s.navBar.subMenu);
  const dispatch = useDispatch();
  const nav = useNavigate();
  

  return (
    <div
      className={ms.container__linkList__myLink}
      key={item.to}
      onClick={() => {
        if (!item.isActive) {
          nav(item.to);
          if (!subMenu.find((i) => i.isActive)) {
            dispatch(setFilteredList(products));
          }
          dispatch(setActive(index));
          localStorage.removeItem("currentLocation");
          localStorage.setItem("currentLocation", index);
        }
      }}
    >
      <li className={item.isActive ? ms.activeBlock : null}>
        <img
          className={item.isActive ? ms.active : null}
          src={item.isActive ? item.active : item.img}
          alt={"link"}
        />
        <span>{item.text}</span>
      </li>
    </div>
  );
};
