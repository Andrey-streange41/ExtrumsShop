import React, { useEffect, useState } from "react";
import ms from "./style.module.scss";
import star from "../../assets/images/star.png";
import birka from "../../assets/images/birka.png";
import favorite2 from "../../assets/images/favorite2.png";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../app/slices/productsListSlice.ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  removeFromFavoriteList,
  likeCliked,
  dislikeCliked,
  viewsUp,
  favorClick,
} from "../../app/slices/productsListSlice.ts";
import { IProduct } from "../../types/favoriteList.types";

export const ProductCard = ({ item }: IProduct) => {
  const dispatch = useDispatch();
  const loc = useLocation();
  const list = useSelector((s) => s.productsList.favoriteList);
  const currentPage = loc.pathname.substring(
    1,
    loc.pathname.indexOf("/", 1) > 0
      ? loc.pathname.indexOf("/", 1)
      : loc.pathname.length
  );
  const link = currentPage + "/" + item.category + "/" + item.id;

  const addToFavoriteList = () => {
    if (list?.findIndex((el) => el.id === item.id) >= 0) {
      dispatch(removeFromFavoriteList({ ...item, isFavor: false }));
      return;
    }
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.title === item.title) return;
    }
    localStorage.setItem("favorList", JSON.stringify([...list, item]));
    const formatItem = {
      ...item.userComunication.find((el) => el.name === "favorite"),
      isActive: true,
      amount:
        item.userComunication.find((el) => el.name === "favorite").amount + 1,
    };
    const tmp = [...item.userComunication];
    tmp.splice(2, 1, formatItem);
    dispatch(addToFavorite({...item,userComunication:[...tmp]}));
  };

  const removeFromFavorite = () => {
    let buffer = JSON.parse(localStorage.getItem("favorList"));
    buffer = buffer.filter((i) => i.title !== item.title);
    localStorage.setItem("favorList", JSON.stringify(buffer));
    dispatch(removeFromFavoriteList(item));
  };

  return (
    <section className={ms.wrapper}>
      <section className={ms.wrapper__lowScreenPriceMenu}>
        <img src={birka} alt="birka.png" />
        <span>${item.price}</span>
      </section>

      <section className={ms.container}>
        <section className={ms.container__favorite}>
          <img
            onClick={item.isFavor ? removeFromFavorite : addToFavoriteList}
            src={
              list?.findIndex((el) => el.id === item.id) >= 0 ? favorite2 : star
            }
            alt=""
          />
        </section>
        <section className={ms.container__productInfo}>
          <Link
            to={"/" + link}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              onClick={() => {
                dispatch(viewsUp(item.id));
              }}
              className={
                ms.container__productInfo__picture + " " + ms.marginLeft2em
              }
              src={item?.img}
              alt="headphones.png"
            />{" "}
          </Link>
          <section className={ms.container__productInfo__descr}>
            <h2>{item.title}</h2>
            {item.characteristics.cardInfo.map((el) => (
              <section
                key={Math.random()}
                className={ms.container__productInfo__descr__section}
              >
                <span>{el.name}</span>
                <span>{el.info}</span>
              </section>
            ))}
            <section className={ms.container__productInfo__descr__price}>
              <img src={birka} alt="birka.png" />
              <span>${item.price}</span>
            </section>
          </section>

          <section className={ms.container__productInfo__userCommunication}>
            {item.userComunication.map((el, index) => (
              <section
                className={ms.container__productInfo__userCommunication__item}
                key={Math.random()}
              >
                <img
                  onClick={
                    el.name === "like"
                      ? () => {
                          dispatch(likeCliked(item.id));
                        }
                      : el.name === "dislike"
                      ? () => dispatch(dislikeCliked(item.id))
                      : el.name === "favorite" &&
                        list?.findIndex((el) => el.id === item.id) >= 0
                      ? removeFromFavorite
                      : el.name === "favorite" &&
                        list?.findIndex((el) => el.id === item.id) < 0
                      ? addToFavoriteList
                      : () => {}
                  }
                  src={
                    el.name === "like" && el.isActive
                      ? el.img2
                      : el.name === "like" && !el.isActive
                      ? el.img
                      : el.name === "dislike" && el.isActive
                      ? el.img
                      : el.name === "dislike" && !el.isActive
                      ? el.img2
                      : el.name === "favorite" &&
                        list?.findIndex((el) => el.id === item.id) < 0
                      ? el.img2
                      : el.name === "favorite" &&
                        list?.findIndex((el) => el.id === item.id) >= 0
                      ? el.img
                      : el.img
                  }
                  alt={"UI.png"}
                />
                <span>{el.amount}</span>
              </section>
            ))}
          </section>
        </section>
      </section>

      <section className={ms.wrapper__lowScreenComMennu}>
        {item.userComunication.map((el) => (
          <section key={Math.random()}>
            <img src={el.img} alt={"UI.png"} />
            <span>{el.amount}</span>
          </section>
        ))}
      </section>
    </section>
  );
};
