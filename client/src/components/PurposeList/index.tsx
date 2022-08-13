import React, { FC } from "react";
import ms from "./style.module.scss";

interface IPurpose {
  list: string[];
  removeTag: () => {};
}

export const PurposeList: FC<IPurpose> = ({ list, removeTag }) => {
  return (
    <ul className={ms.purposeList}>
      {list.map((el) => (
        <li>
          {<span>{el}</span>}{" "}
          <img
            onClick={()=>removeTag(el)}
            src={require("../../assets/images/closeModal.png")}
            alt="alt.png"
          />
        </li>
      ))}
    </ul>
  );
};
