import React, { useEffect, useState } from "react";
import ms from "./style.module.scss";
import check from "../../../assets/images/check.png";
import { checkBoxActive } from "../../../app/slices/navBarSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredList } from "../../../app/slices/productsListSlice.ts";
import {
  setSelectedItems,
  removeSelectedItem,
} from "../../../app/slices/modalFilterSlice.ts";

export const CheckBox = ({ item }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const filteredList = useSelector((s) => s.productsList.filteredList);
  const selectedItems = useSelector((s) => s.modalFilter.selectedItems);

  useEffect(() => {
   
    if (active) {
      const buffer = [];
      for (let i = 0; i < filteredList.length; i++) {  //change list maybe
        const element = filteredList[i];
        for (let j = 0; j < element.purpose.length; j++) {
          const purposeItem = element.purpose[j];
          if (
            selectedItems?.findIndex((el) => el.name === purposeItem.name) >= 0
          ) {
            buffer.push(element);
            break;
          }
        }
      }
      dispatch(setFilteredList(buffer));
    }
  }, [active]);

  return (
    <section className={ms.container}>
      <div
        className={
          active ? ms.container__box + " " + ms.active : ms.container__box
        }
        onClick={() => {
          if (active) {
            setActive(false);
            dispatch(removeSelectedItem(item.name));
          } else {
            setActive(true);
            dispatch(setSelectedItems({ name: item.name, isActive: true }));
          }
        }}
      >
        <img src={active ? check : null} alt="" />
      </div>
      <label htmlFor="">{item?.name || false}</label>
    </section>
  );
};
