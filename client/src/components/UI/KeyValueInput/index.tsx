import React, { FC, useState, ChangeEvent } from "react";
import ms from "./style.module.scss";
import {Button} from '../Button/index.tsx'

interface IKeyValueProps {
  name?: string;
  value?: string;
  add: () => {};
}

interface IItem{
    name: string;
    info: string;
}

export const KeyValueInput: FC<IKeyValueProps> = ({ name, value, add }) => {
  const [characteristick, setCharacteristick] = useState<IItem>({
    name: "",
    info: "",
  });
  const setCharacteristic = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacteristick({ ...characteristick, [e.target.name]: e.target.value });
  };
  return (
    <section className={ms.characteristics}>
      
      <section>
        <span>Name:</span>
       <input value={characteristick.name}
        name="name"
        type="text"
        onChange={setCharacteristic}
      />
      </section>
      
      <section>
        <span>Value:</span>{" "}
      <input
        value={characteristick.info}
        name="info"
        type="text"
        onChange={setCharacteristic}
      />
      </section>
      
      <Button  handleSubmit={()=>add(characteristick)} text={'Add'} width={150}/>
    </section>
  );
};
