import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sort } from '../../../components/ToolsPanel/Sort/index.tsx';
import { Comment } from '../Comment/index.tsx';
import ms from './style.module.scss';

export const CommentsList = ({item}) => {
  const productsList = useSelector(s=>s.productsList.productsList);
  const filteredList = useSelector(s=>s.productsList.filteredList);
  const [itemWithComments,setItem] = useState(item);

  useEffect(()=>{
    setItem(productsList.find(el=>el.id===item.id))
  },[productsList,filteredList])
  
  return (
    <section className={ms.container}>
        <section className={ms.container__sort}>
            <Sort item={itemWithComments}/>
        </section>
        {itemWithComments.comments.map(el=><Comment comment={el}/>)}
    </section>
  )
}
