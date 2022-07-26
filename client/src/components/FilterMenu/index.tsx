import React from "react";
import ms from "./style.module.scss";
import birdDown from "../../assets/images/birdDown.png";
import birdUp from "../../assets/images/birdUpModal.png";
import { useDispatch, useSelector } from "react-redux";
import { selectModalItem } from "../../app/slices/navBarSlice.ts";
import { CheckBox } from "./CheckBox/index.jsx";
import closeModal from "../../assets/images/closeModal.png";
import { switchFilterMenu } from "../../app/slices/toolsPanelSlice.ts";
import {
  switchCategoryMenu,
  switchPriceMenu,
  switchAddMenu1,
  switchAddMenu2,
} from "../../app/slices/modalFilterSlice.ts";
import { setFilteredList } from "../../app/slices/productsListSlice.ts";

export const FilterMenu = () => {
  const subMenu = useSelector((s) => s.navBar.subMenu);
  const isOpenCategoryMenu = useSelector(
    (s) => s.modalFilter.isOpenCategoryMenu
  );
  const dispatch = useDispatch();
  const isActiveFilterMenu = useSelector(
    (s) => s.toolsPanel.isActiveFilterMenu
  );
  const isOpenPriceMenu = useSelector((s) => s.modalFilter.isOpenPriceMenu);
  const isOpenAddMenu_1 = useSelector((s) => s.modalFilter.isOpenAddMenu_1);
  const isOpenAddMenu_2 = useSelector((s) => s.modalFilter.isOpenAddMenu_2);
  const productsList = useSelector(s=>s.productsList.productsList);

  return (
    <section
      className={
        isActiveFilterMenu
          ? ms.container + " " + ms.active
          : ms.container + " " + ms.unactive
      }
    >
      <section className={ms.container__categories}>
        <img
          src={!isOpenCategoryMenu ? birdUp : birdDown}
          alt="bird.png"
          onClick={() => {
            dispatch(switchCategoryMenu());
          }}
        />
        <h2>Categories</h2>
      </section>
      <img
        onClick={() => dispatch(switchFilterMenu())}
        className={ms.container__closeModal}
        src={closeModal}
        width={30}
        height={30}
      />
      <ul
        className={
          !isOpenCategoryMenu
            ? ms.container__list + " " + ms.unactive
            : ms.container__list
        }
      >
        {subMenu
          .find((i) => i.isActive)
          ?.modalItems.items.map((item, index) => (
            <section className={ms.container__list__item} key={index}>
              <li>
                <div
                  className={item.isActive ? ms.radioActive : null}
                  onClick={() => {
                    dispatch(
                      setFilteredList(
                        productsList.filter((el) => String(el.subCategory).toLowerCase() === String(item.category).toLowerCase())
                      )
                    );
                    dispatch(selectModalItem(index));
                  }}
                ></div>
              </li>
              <label htmlFor={item.category}>{item.category}</label>
            </section>
          ))}
      </ul>
      <div className={ms.border}></div>
      <section className={ms.container__categories}>
        <img
          src={!isOpenPriceMenu ? birdUp : birdDown}
          alt="bird.png"
          onClick={() => dispatch(switchPriceMenu())}
        />
        <h2>Price</h2>
      </section>
      <section
        className={
          isOpenPriceMenu
            ? ms.container__price
            : ms.container__price + " " + ms.unactive
        }
      >
        <input type="text" placeholder="10$" maxLength={6} />
        <div className={ms.line}></div>
        <input type="text" placeholder="156000$" maxLength={6} />
      </section>
      <div className={ms.border}></div>
      <section className={ms.container__categories}>
        <img
          src={isOpenAddMenu_1 ? birdDown : birdUp}
          alt="bird.png"
          onClick={() => dispatch(switchAddMenu1())}
        />
        <h2>Connection method</h2>
      </section>
      <section
        className={
          isOpenAddMenu_1
            ? ms.container__checkboxMenu1
            : ms.container__checkboxMenu1 + " " + ms.unactive
        }
      >
        <CheckBox />
        <CheckBox />
        <CheckBox />
      </section>
      <div className={ms.border}></div>
      <section className={ms.container__categories}>
        <img
          src={isOpenAddMenu_2 ? birdDown : birdUp}
          alt="bird.png"
          onClick={() => dispatch(switchAddMenu2())}
        />
        <h2>Purpose</h2>
      </section>
      <section
        className={
          isOpenAddMenu_2
            ? ms.container__checkboxMenu2
            : ms.container__checkboxMenu2 + " " + ms.unactive
        }
      >
        <CheckBox />
        <CheckBox />
        <CheckBox />
        <CheckBox />
        <CheckBox />
      </section>
    </section>
  );
};
