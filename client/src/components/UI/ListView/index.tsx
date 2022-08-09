import React, { useEffect, useState } from 'react';
import ms from './style.module.scss';



export const ListView = ({ list,onClick,selectedItem }) => {
  const [isOpen, setOpen] = useState(false);
  
 
  
  return (
    <div className={ms.container}>
      <label className={ms.container__myLabel} htmlFor="input">Category</label>
      <section id={'input'} className={ms.container__myInput}>
        <span>{selectedItem}</span>
        <img src={isOpen ?
         require('../../../assets/images/birdUpModal.png') 
        : require('../../../assets/images/birdDown.png')} alt="bird" 
        onClick={()=>setOpen(!isOpen)}
        />
      </section>
      <ul className={isOpen?ms.container__modal + ' ' + ms.active:ms.container__modal }>
        {list?.map(el => <li onMouseUp={()=>setOpen(false)} key={el} onClick={onClick}>{el}</li>)}
      </ul>
    </div>
  )
}
