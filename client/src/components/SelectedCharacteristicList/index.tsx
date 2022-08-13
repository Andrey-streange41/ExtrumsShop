import React, { FC } from "react";
import ms from "./style.module.scss";

interface ICharacteristicsListProps {
  list: string[];
  removeCharacter: () => {};
}

export const SelectedCharacteristicsList: FC<ICharacteristicsListProps> = ({
  list,
  removeCharacter,
}) => {
  return (
    <ul className={ms.container}>
      {list.map((el) => (
        <li key={Math.random()} onClick={() => removeCharacter(el.name)}>
          <span >{el.name}</span>:
          <span>{el.info}</span>{" "}
        </li>
      ))}
    </ul>
  );
};
