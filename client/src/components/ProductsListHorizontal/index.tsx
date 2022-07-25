import React from "react";
import { ProductCard } from "../ProductCard/index.tsx";
import dron from "../../assets/images/dron.webp";
import laptop1 from "../../assets/images/laptop1.jpg";
import galaxyS from "../../assets/images/galaxyS.jpg";
import { tmpProductList } from "../../localDB/index.ts";
import { useSelector } from "react-redux";

export const ProductListHorizontal = () => {
    const productList = useSelector(s=>s.productsList.productsList);
    
  return (
    <>
      {productList.map((item) => (
        <ProductCard key={item.title} item={item} />
      ))}
    </>
  );
};
