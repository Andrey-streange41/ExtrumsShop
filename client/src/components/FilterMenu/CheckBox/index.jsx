import React, { useState } from "react";
import ms from "./style.module.scss";
import check from "../../../assets/images/check.png";

export const CheckBox = () => {
  const [active, setActive] = useState(false);
  return (
    <section className={ms.container}>
      <div
        className={
          active ? ms.container__box + " " + ms.active : ms.container__box
        }
        onClick={() => setActive(!active)}
      >
        <img src={active ? check : null} alt="" />
      </div>
      <label htmlFor="">Wireless</label>
    </section>
  );
};
