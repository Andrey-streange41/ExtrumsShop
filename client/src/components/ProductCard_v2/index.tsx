import React, { FC, useEffect, useState } from "react";
import ms from "./style.module.scss";
import birka from "../../assets/images/birka.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IProduct, IUserInterfaceItem } from "../../types/favoriteList.types";
import { userCommunication } from "../../assets/images/index.js";
import {
  updateProductsThunk,
  addToFavoritesThunk,
  removeFromFavoriteListThunk,
} from "../../app/slices/productsListSlice.ts";

interface ICardProps {
  item: IProduct;
}

export const ProductCard_v2: FC<ICardProps> = ({ item }) => {
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
  const isAuth = useSelector((s) => s.user.isAuth);
  const [coms, setComs] = useState<IUserInterfaceItem[]>([]);
  const user = useSelector((s) => s.user.userData);
  const loading = useSelector((s) => s.productsList.loading);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      alert("You must sign in to you account for this option !");
      return;
    }
    dispatch(
      updateProductsThunk({
        name: "favorites",
        id: item.id,
      })
    )
      .then((data) => {
        const favoriteState = data.payload
          .find((el) => el.id === item.id)
          .userComunications.find((el) => el.name === "favorites").isActive;
        if (favoriteState === true) {
          dispatch(
            addToFavoritesThunk({ productId: item.id, userId: user.id })
          );
        } else {
          dispatch(
            removeFromFavoriteListThunk({ productId: item.id, userId: user.id })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setComs(
      [...item?.userComunications]?.sort(
        (a: IUserInterfaceItem, b: IUserInterfaceItem): number =>
          String(a.name).localeCompare(b.name)
      )
    );
  }, [item, user.id, loading]);

  return (
    <section className={ms.container}>
      <section className={ms.container__favorite}>
        <img
          onClick={handleFavoriteClick}
          src={
            item?.userComunications?.find((el) => el.name === "favorites")
              ?.isActive
              ? userCommunication[2]
              : userCommunication[6]
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
        <Link
          to={"/" + link}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            onClick={() => {
              dispatch(updateProductsThunk({ name: "views", id: item.id }));
            }}
            src={
              "http://localhost:5000/" +
              String(item?.avatar).replace('"', "").replace('"', "")
            }
            alt="headphones.png"
          />{" "}
        </Link>
      </section>

      <section className={ms.container__UI}>
        {coms.map((el) => (
          <section key={Math.random()} className={ms.container__UI__item}>
            <img
              onClick={
                el.name === "likes"
                  ? () => {
                      if (!isAuth) {
                        alert(
                          "You must sign in to you account for this option !"
                        );
                        return;
                      }
                      dispatch(
                        updateProductsThunk({ name: "likes", id: item.id })
                      );
                    }
                  : el.name === "dislikes"
                  ? () => {
                      if (!isAuth) {
                        alert(
                          "You must sign in to you account for this option !"
                        );
                        return;
                      }
                      dispatch(
                        updateProductsThunk({
                          name: "dislikes",
                          id: item.id,
                        })
                      );
                    }
                  : el.name === "favorites"
                  ? handleFavoriteClick
                  : () => {}
              }
              src={
                el.name === "likes" && el.isActive
                  ? userCommunication[4]
                  : el.name === "likes" && !el.isActive
                  ? userCommunication[0]
                  : el.name === "dislikes" && el.isActive
                  ? userCommunication[1]
                  : el.name === "dislikes" && !el.isActive
                  ? userCommunication[5]
                  : el.name === "favorites" && el.isActive
                  ? userCommunication[2]
                  : el.name === "favorites" && !el.isActive
                  ? userCommunication[6]
                  : userCommunication[3]
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
