import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { setActive } from "../../../app/slices/navBarSlice.ts";
import { selectSubItem } from "../../../app/slices/navBarSlice.ts";
import { setFilteredList } from "../../../app/slices/productsListSlice.ts";
import { Modal } from "./Modal/index.tsx";
import ms from "./style.module.scss";
import { getProductsThunk } from "../../../app/slices/productsListSlice.ts";

export const SubMenu = () => {
  const loc = useLocation();
  const subMenu = useSelector((s) => s.navBar.subMenu);
  const list = useSelector((s) => s.navBar.items);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const filteredList = useSelector((s) => s.productsList.productsList);

 
  
  return (
    <section
      className={ms.container}
      style={
        list.find(el=>el.text === 'categories').isActive|| list.find(el=>el.text === 'favorites').isActive ?
        {
           display:"flex"
        }
        :
        {
          display:"none"
       }

      }
    >
      {subMenu.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if( list.find(el=>el.text === 'categories').isActive){
               nav("/" +  "catalog/" + item.text);
            }
            else if ( list.find(el=>el.text === 'favorites').isActive){
              nav("/" +  "favorites/" + item.text);
            }

            const query = {
              category: "",
            };
            query.category = item.text;

            dispatch(getProductsThunk(query));

            dispatch(selectSubItem(index));
          }}
          className={
            (item.isActive ? ms.activeBlock + " " : "") + ms.container__item
          }
        >
          <img src={item.img} alt="submenuItem.png" />
          <span>{item.text}</span>
          <Modal
            test={item}
            item={item.modalItems}
            active={item.isActive ? true : false}
          />
        </div>
      ))}
    </section>
  );
};
