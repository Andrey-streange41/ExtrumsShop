import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ms from "./style.module.scss";
import { Button } from '../../../components/UI/Button/index.tsx';
import { setComment } from "../../../app/slices/productsListSlice.ts";
import { IProduct } from "../../../favoriteList.types";

interface IAddCommentsProps {
  item: IProduct
}

export const AddComment: FC<IAddCommentsProps> = ({ item }) => {
  const user = useSelector((s) => s.user.userData);
  const productsList = useSelector(s => s.productsList.productsList);
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState('');

  let prodList = [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let month = d.getMonth();
  let day = d.getDate();
  let year = d.getFullYear();
  let hour = d.getHours();
  let min = d.getMinutes();
  useEffect(() => {


  }, [productsList]);



  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const date = { day: day, hour: hour, minute: min, month: month, year: year, second: null }
    dispatch(setComment({ data: { owner: user.firstname, avatar: user.avatar, date: date, message: textMessage }, id: item.id }))
    setTextMessage('')
  }

  return (
    <div className={ms.container}>
      <section className={ms.container__userInfo}>
        <img src={user.avatar || 'Anonimus'} alt="avatar.png" />
        <span>{user.firstname}</span>
        <span>{months[month] + " " + day + ", " + year}</span>
        <span>{hour + " : " + min + " PM"}</span>
      </section>
      <section className={ms.container__comment}>
        <textarea value={textMessage} onChange={(e) => setTextMessage(e.target.value)} maxLength={200} name="story" placeholder="Comment text...">
        </textarea>
      </section>
      <Button text={'Add comment'} handleSubmit={handleClick} />
    </div>
  );
};
