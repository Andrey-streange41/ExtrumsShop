import React, { useEffect, useState } from "react";
import ms from "./style.module.scss";
import star from "../../assets/images/star.png";
import birka from "../../assets/images/birka.png";
import favorite2 from "../../assets/images/favorite2.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToFavorite,
  removeFromFavoriteList,
  dislikeCliked,
  likeCliked,
  viewsUp,
} from "../../app/slices/productsListSlice.ts";
import { IProduct } from "../../types/favoriteList.types";

export const ProductCard_v2 = ({ item }: IProduct) => {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.productsList.favoriteList);
  const nav = useNavigate();
  const loc = useLocation();
  const currentPage = loc.pathname.substring(
    1,
    loc.pathname.indexOf("/", 1) > 0
      ? loc.pathname.indexOf("/", 1)
      : loc.pathname.length
  );
  const link = currentPage + "/" + item.category + "/" + item.id;

  const addToFavoriteList = () => {
    if (list.findIndex((el) => el.id === item.id) >= 0) {
      dispatch(removeFromFavoriteList({ ...item }));

      return;
    }
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.title === item.title) return;
    }
    localStorage.setItem("favorList", JSON.stringify([...list, item]));
    dispatch(addToFavorite({ ...item, isFavor: true }));
  };
  const removeFromFavorite = () => {
    dispatch(removeFromFavoriteList(item));
  };
  return (
    <section className={ms.container}>
      <section className={ms.container__favorite}>
        <img
          onClick={item.isFavor ? removeFromFavorite : addToFavoriteList}
          src={
            list.findIndex((el) => el.id === item.id) >= 0 ? favorite2 : star
          }
          alt="star.png"
        />
      </section>
      <h2>{item.title}</h2>

      <section className={ms.container__price}>
        <img src={birka} alt="birka.png" />
        <span>${item.price}</span>
      </section>
      <section
        onClick={() => {
          dispatch(viewsUp(item.id));
          nav("/" + link);
        }}
        className={ms.container__wrapper}
      >
        <img src={item.img} alt="headphones.png" />
      </section>

      <section className={ms.container__UI}>
        {item.userComunication.map((el) => (
          <section key={Math.random()} className={ms.container__UI__item}>
            <img
              onClick={
                el.name === "like"
                  ? () => {
                      dispatch(likeCliked(item.id));
                    }
                  : el.name === "dislike"
                  ? () => dispatch(dislikeCliked(item.id))
                  : el.name === "favorite" &&
                    list.findIndex((el) => el.id === item.id) >= 0
                  ? removeFromFavorite
                  : el.name === "favorite" &&
                    list.findIndex((el) => el.id === item.id) < 0
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
                    list.findIndex((el) => el.id === item.id) < 0
                  ? el.img2
                  : el.name === "favorite" &&
                    list.findIndex((el) => el.id === item.id) >= 0
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
  );
};
