import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProductCard } from '../ProductCard/index.tsx';
import { ProductCard_v2 } from '../ProductCard_v2/index.tsx';
import ms from  './style.module.scss';

export const FilteredList = ({filterList}) => {
    const mode = useSelector(s=>s.toolsPanel.isActiveViewMode);
    const testList = useSelector(s=>s.productsList.testList);
 const [list,setList]=useState([]);
    
 useEffect(()=>{
  setList(testList)
  
  
  
 },[testList])
  
    

  return (
    <>
        {
        mode
        ?
        <section className={ms.container}>
         { filterList?.map(item=><ProductCard_v2 key={item.title} item={item}/>)}
        </section>
        :
        null
        // filterList.map(item=><ProductCard key={item.title} item={item}/>)
        }
        {
          filterList?.map(item=><ProductCard key={item.title} item={item}/>)
        }
    </>
  )
}
