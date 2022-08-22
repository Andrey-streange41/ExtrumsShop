import React from "react";
import ms from "./style.module.scss";
import viewChange from "../../assets/images/viewChange.png";
import ddd from "../../assets/images/birdUp.png";
import birdDown from "../../assets/images/birdDown.png";
import birdUp from "../../assets/images/ddd.png";
import filter from "../../assets/images/filters.png";
import { useDispatch, useSelector } from "react-redux";
import {
  switchMode,
  switchFilterMenu,
  switchPriceMenu,
} from "../../app/slices/toolsPanelSlice.ts";
import viewMode2 from "../../assets/images/viewChange2.png";
import sortBlack from "../../assets/images/sortBlack.png";
import reverseFilter from "../../assets/images/reverseFilter.png";
import { Sort } from "./Sort/index.tsx";


export const ToolsPanel = () => {
  const currentCategory = useSelector((s) => s.navBar.subMenu);
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.toolsPanel.isActiveViewMode);
  const isActiveFilterMenu = useSelector(
    (s) => s.toolsPanel.isActiveFilterMenu
  );
  

  return (
    <section className={ms.container}>
      <img
        onClick={() => dispatch(switchMode())}
        src={mode ? viewMode2 : viewChange}
        alt="viev.png"
        className={ms.container__view}
      />
      <Sort category={'products'}/>
      <section
        className={ms.container__rectangle2}
        onClick={() => dispatch(switchFilterMenu())}
      >
        <img
          src={!isActiveFilterMenu ? filter : reverseFilter}
          alt="filter.png"
        />
      </section>
      <section className={ms.container__rectangle3}>
        <span style={{ marginLeft: 20 }}>Subcategory: </span>{" "}
        <span style={{ marginRight: 20 }}>
          {currentCategory
            .filter((i) => i.isActive)[0]
            ?.modalItems?.items.filter((i) => i?.isActive)[0]?.category
            ? currentCategory
                .filter((i) => i.isActive)[0]
                ?.modalItems?.items.filter((i) => i?.isActive)[0]?.category
            : "Empty..."}
        </span>
      </section>
    </section>
  );
};
