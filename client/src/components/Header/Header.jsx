import React from "react";
import ms from "./style.module.scss";
import logo from "../../assets/images/basket.png";
import title from "../../assets/images/title.png";
import search from "../../assets/images/search.png";
import user from "../../assets/images/user.png";
import { Link } from "react-router-dom";

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

      <section className={ms.container__searchSection}>
        <section className={ms.container__searchSection__searchWrapper}>
          <img
            className={ms.container__searchSection__searchWrapper__search}
            src={search}
            alt="search.png"
          />
        </section>
        <section className={ms.container__searchSection__inputWrapper}>
          <input
            className={ms.container__searchSection__inputWrapper__input}
            type="text"
            placeholder="Search"
          />
        </section>
      </section>
      <Link to={'/account'}>
       <img  className={ms.container__avatar} src={user} alt="avatar.png" />
      </Link>
     
    </section>
  );
};

export default Header;
