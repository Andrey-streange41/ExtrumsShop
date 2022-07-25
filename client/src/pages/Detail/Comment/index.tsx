import React from 'react';
import ms from './style.module.scss';

export const Comment = ({comment}) => {
  return (
    <section className={ms.container}>
      <section className={ms.container__userInfo} >
        <img src={comment.avatar} alt="avatar.png" />
         <span>{comment.owner}</span>
         <span>{comment.date.month +' '+ comment.date.day +', '+ comment.date.year}</span>
         <span>{comment.date.hour+' : '+comment.date.minute+ ' PM'}</span>
      </section>
      <section className={ms.container__message }>
        {comment.message}
      </section>
    </section>
  )
}
