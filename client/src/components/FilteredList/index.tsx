import React from 'react'
import { useSelector } from 'react-redux';
import { ProductCard } from '../ProductCard/index.tsx';
import { ProductCard_v2 } from '../ProductCard_v2/index.tsx';
import ms from  './style.module.scss';

export const FilteredList = () => {
    const filteredList = useSelector((s)=>s.productsList.filteredList);
    const mode = useSelector(s=>s.toolsPanel.isActiveViewMode);

  return (
    <>
        {
        mode
        ?
        <section className={ms.container}>
         { filteredList.map(item=><ProductCard_v2 key={item.title} item={item}/>)}
        </section>
        :
        filteredList.map(item=><ProductCard key={item.title} item={item}/>)
        
        }
    </>
  )
}
