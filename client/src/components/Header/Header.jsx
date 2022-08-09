import React, { useState } from "react";
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
import { setFavorFilterList } from "../../app/slices/productsListSlice.ts";

const Header = () => {
  const avatar = useSelector(s=>s.user.userData.avatar);
  const isAuth = useSelector(s=>s.user.isAuth);
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

      <Link to={isAuth?"/account":"/login"}>
        <img className={ms.container__avatar} src={!avatar||avatar.includes('null')?user:avatar} alt="avatar.png" />
      </Link>
    </section>
  );
};

export default Header;

const Search = () => {
  const dispatch = useDispatch();
  let keyword = useSelector((s) => s.search.text);
  const list = useSelector((s) => s.productsList.productsList);
  const favorList = useSelector((s) => s.productsList.favoriteList);

  const navItems = useSelector((s) => s.navBar.items);
  const nav = useNavigate();
  const loc = useLocation();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    goToSearch();

 
  }, [keyword, modal]);

  const goToSearch = () => {
    dispatch(
      setFilteredList(
        list.filter((el) =>
          String(el.title).toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
    dispatch(
      setFavorFilterList(
        favorList.filter((el) =>
          String(el.title).toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
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
      <section
        onMouseLeave={() => {
          setModal(false);
        }}
        className={ms.container__searchSection__inputWrapper}
      >
        <input
          onChange={(e) => {
            setModal(true);
            if (loc.pathname.split("/")[1] === "") {
              nav("/catalog");
              dispatch(
                setActive(navItems.findIndex((el) => el.to === "/catalog"))
              );
              localStorage.setItem(
                "currentLocation",
                navItems.findIndex((el) => el.to === "/catalog")
              );
            }
            dispatch(setText(e.target.value));
          }}
          value={keyword}
          className={ms.container__searchSection__inputWrapper__input}
          type="text"
          placeholder="Search"
        />
        <Modal isActive={modal} />
      </section>
    </section>
  );
};

const Modal = ({ isActive }) => {
  const filteredList = useSelector((s) => s.productsList.filteredList);
  const list = useSelector((s) => s.productsList.productsList);
  let keyword = useSelector((s) => s.search.text);
  const dispatch = useDispatch();
  return (
    <section
      className={
        isActive
          ? ms.container__searchSection__inputWrapper__modal +
            " " +
            ms.modalActive
          : ms.container__searchSection__inputWrapper__modal
      }
    >
      <section
        className={ms.container__searchSection__inputWrapper__modal__list}
      >
        {filteredList.map((el) => (
          <li
            onClick={(e) => {
              dispatch(setText(e.target.innerHTML));
            }}
            key={el.title}
          >
            {el.title}
          </li>
        ))}
        <div
          className={ms.container__searchSection__inputWrapper__modal__border}
        ></div>
      </section>

      <section
        className={ms.container__searchSection__inputWrapper__modal__goods}
      >
        <h3>Goods</h3>
        <section
          className={
            ms.container__searchSection__inputWrapper__modal__goods__row
          }
        >
          {filteredList.find(
            (el) =>
              String(el.title).toLowerCase() === String(keyword).toLowerCase()
          ) ? (
            <Link
              to={`/catalog/${
                list.find(
                  (el) =>
                    String(el.title).toLowerCase() ===
                    String(keyword).toLowerCase()
                )?.category
              }/${
                filteredList.find(
                  (el) =>
                    String(el.title).toLowerCase() ===
                    String(keyword).toLowerCase()
                )?.id
              }`}
            >
              <img
                src={
                  filteredList.find(
                    (el) =>
                      String(el.title).toLowerCase() ===
                      String(keyword).toLowerCase()
                  ).img
                }
              />
            </Link>
          ) : (
            <img src={require("../../assets/images/notFound.webp")} />
          )}

          <span>
            {filteredList.find(
              (el) =>
                String(el.title).toLowerCase() === String(keyword).toLowerCase()
            ) ? (
              <Link
                to={`/catalog/${
                  list.find(
                    (el) =>
                      String(el.title).toLowerCase() ===
                      String(keyword).toLowerCase()
                  )?.category
                }/${
                  filteredList.find(
                    (el) =>
                      String(el.title).toLowerCase() ===
                      String(keyword).toLowerCase()
                  )?.id
                }`}
              >
                {
                  filteredList.find(
                    (el) =>
                      String(el.title).toLowerCase() ===
                      String(keyword).toLowerCase()
                  ).title
                }
              </Link>
            ) : (
              <section>"nothing..."</section>
            )}
          </span>
        </section>
      </section>
    </section>
  );
};
