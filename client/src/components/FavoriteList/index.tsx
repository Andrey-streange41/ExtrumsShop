import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../ProductCard/index.tsx";
import { ProductCard_v2 } from "../ProductCard_v2/index.tsx";
import ms from "./style.module.scss";
import Loader from "../Loader/index.tsx";
import { IProduct } from "../../types/favoriteList.types.ts";

export const FavoriteList = () => {
  const favList = useSelector((s) => s.productsList.favoriteList);
  const mode = useSelector((s) => s.toolsPanel.isActiveViewMode);
  const loading = useSelector((s) => s.productsList.loading);

  return favList.length <= 0 ? (
    <>
      {loading === "pending" ? (
        <Loader />
      ) : (
        <>
          {mode ? (
            <section className={ms.container}>
              {favList.map((item:IProduct) => (
                <ProductCard_v2 key={item.title} item={item} />
              ))}
            </section>
          ) : (
            favList.map((i:IProduct) => <ProductCard key={i.title} item={i} />)
          )}
        </>
      )}
    </>
  ) : (
    <h1>Favorite list is empty</h1>
  );
};
