import React from "react";
import ms from "./style.module.scss";
import logo from "../../assets/images/basket.png";
import title from "../../assets/images/title.png";
import search from "../../assets/images/search.png";
import user from "../../assets/images/user.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../../app/slices/searchSlice.ts";
import { useEffect } from "react";

import { setFilteredList } from "../../app/slices/productsListSlice.ts";
import { setActive } from "../../app/slices/navBarSlice.ts";
import { setFavoriteList } from "../../app/slices/productsListSlice.ts";

const Header = () => {
  
  return (
    <section className={ms.container}>
      <section className={ms.container__logoSection}>
        <Link to={"/"}>
          <img
            className={ms.container__logoSection__logo}
            src={logo}
            alt="logo.png"
          />
        </Link>
        <Link to={"/"}>
          <img
            className={ms.container__logoSection__title}
            src={title}
            alt="title.png"
          />
        </Link>
      </section>
      <Search />

      <Link to={"/account"}>
        <img className={ms.container__avatar} src={user} alt="avatar.png" />
      </Link>
    </section>
  );
};

export default Header;

const Search = () => {
  const dispatch = useDispatch();
  let keyword = useSelector((s) => s.search.text);
  const list = useSelector((s) => s.productsList.productsList);
  
  const navItems = useSelector(s=>s.navBar.items);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    goToSearch();
  }, [keyword]);

  const goToSearch = () => {
    dispatch(setFilteredList(list.filter((el) => String(el.title).toLowerCase().includes(keyword.toLowerCase()))));
    
  };
  return (
    <section className={ms.container__searchSection}>
      <section className={ms.container__searchSection__searchWrapper}>
        <img
          onClick={() => {
            localStorage.setItem("find", keyword);
          }}
          className={ms.container__searchSection__searchWrapper__search}
          src={search}
          alt="search.png"
        />
      </section>
      <section className={ms.container__searchSection__inputWrapper}>
        <input
          onChange={(e) => {
            if (loc.pathname.split("/")[1] === "") {
              nav("/catalog");
              dispatch(setActive(navItems.findIndex(el=>el.to==='/catalog')));
              localStorage.setItem("currentLocation",navItems.findIndex(el=>el.to==='/catalog'));
            }
            dispatch(setText(e.target.value));
          }}
          value={keyword}
          className={ms.container__searchSection__inputWrapper__input}
          type="text"
          placeholder="Search"
        />
      </section>
    </section>
  );
};
