import React from "react";
import { IProduct } from "../../types/favoriteList.types.ts";
import { ProductCard } from "../ProductCard/index.tsx";
import { ProductCard_v2 } from "../ProductCard_v2/index.tsx";
import ms from "./style.module.scss";
import { useAppSelector } from "../../hooks.ts";
import { RootState } from "../../app/store";

export const FilteredList = ({ filterList }) => {
  const mode = useAppSelector((s:RootState) => s.toolsPanel.isActiveViewMode);
  
  return (
    <>
      {mode ? (
        <section className={ms.container}>
          {filterList?.map((item:IProduct) => (
            <ProductCard_v2 key={Math.random()} item={item} />
          ))}
        </section>
      ) : (
        filterList?.map((item:IProduct) => (
          <ProductCard key={Math.random()} item={item} />
        ))
      )}
    </>
  );
};
