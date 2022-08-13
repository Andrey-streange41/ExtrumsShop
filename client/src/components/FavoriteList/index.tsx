import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../ProductCard/index.tsx';
import { ProductCard_v2 } from '../ProductCard_v2/index.tsx';
import ms from './style.module.scss';

export const FavoriteList = () => {
    const favList = useSelector(s=>s.productsList.favoriteList);
    const mode = useSelector(s=>s.toolsPanel.isActiveViewMode);
   

  return (
    <>
        {
          mode
          ?
          <section className={ms.container}>
         { favList.map(item=><ProductCard_v2 key={item.title} item={item}/>)}
        </section>
          :
        favList.map(i=><ProductCard key={i.title} item={i}/>)
        }

    </>
  )
}
