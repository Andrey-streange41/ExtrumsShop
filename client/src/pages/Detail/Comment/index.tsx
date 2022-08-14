import React ,{FC} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import {removeCommentThunk} from '../../../app/slices/productsListSlice.ts';
import ms from './style.module.scss';
import close from '../../../assets/images/closeModal.png';

const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

export const Comment:FC = ({comment}) => {
  const dispatch = useDispatch();
  const removeComment = () => {
      dispatch(removeCommentThunk(comment.id))
  }
  
  return (
    <section className={ms.container}>
      <section className={ms.container__userInfo} >
        <img src={'http://localhost:5000/'+ comment?.user?.user_info?.avatar} alt="avatar.png" />
         <span>{comment?.user?.user_info?.firstname}</span>
         <span>{month[comment?.date?.month] +' '+ comment?.date?.day +', '+ comment?.date?.year}</span>
         <span>{comment?.date?.hour+' : ' + comment?.date?.min+ ' PM'}</span>
      </section>
      <section className={ms.container__message }>
        {comment.message}
      </section>
      <img onClick={removeComment} className={ms.remove} src={close} alt="remove.png" />
    </section>
  )
}
