import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sort } from '../../../components/ToolsPanel/Sort/index.tsx';
import { Comment } from '../Comment/index.tsx';
import ms from './style.module.scss';
import {Button}from '../../../components/UI/Button/index.tsx';
import {IProduct} from '../../../types/favoriteList.types.ts'
import { AddComment } from '../AddComment/index.tsx';
import {$host} from '../../../http/index.ts';
import {getCommentsThunk} from '../../../app/slices/commentsSlice.ts'

interface ICommentsListProps{
  item:IProduct
}


export const CommentsList:FC<ICommentsListProps> = ({item}) => {
  
  const commentsReq = useSelector(s=>s.comments.comments);
  const [comments,setComments] = useState(commentsReq);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    setComments(commentsReq);
    dispatch(getCommentsThunk(item.id))
  },[item]);

   
  
  return (
    <section className={ms.container}>
        <section className={ms.container__sort}>
            <Sort item={item}/>
        </section>
        {comments.map(el=><Comment item={item} comment={el}/>)}
            <AddComment item={item}/>
    </section>
  )
}
