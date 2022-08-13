import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ms from './style.module.scss';

const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

export const Comment = ({comment,item}) => {
  
  return (
    <section className={ms.container}>
      <section className={ms.container__userInfo} >
        <img src={'http://localhost:5000/'+comment.user.user_info.avatar} alt="avatar.png" />
         <span>{comment.user.user_info.firstname}</span>
         <span>{month[comment.date?.month] +' '+ comment.date?.day +', '+ comment.date?.year}</span>
         <span>{comment.date?.hour+' : '+comment.date?.min+ ' PM'}</span>
      </section>
      <section className={ms.container__message }>
        {comment.message}
      </section>
    </section>
  )
}
