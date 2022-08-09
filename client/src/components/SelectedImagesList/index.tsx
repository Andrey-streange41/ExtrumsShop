import React, { FC } from 'react';
import ms_list from './list-style.module.scss';
import ms_item from './item-style.module.scss';

interface ISelectedImagesListProps {
    images: string[];
    removeItem:()=>{};
}

export const SelectedImagesList: FC<ISelectedImagesListProps> = ({ images,removeItem }) => {
    return (
        <ul className={ms_list.list}>
            {images.map(el => <ListItem removeItem={removeItem} img={el} />)}
        </ul>
    )
}

interface IListItemProps {
    img: string;
    removeItem:()=>{}
}


const ListItem: FC<IListItemProps> = ({ img,removeItem }) => {
    console.log(window.URL.createObjectURL(img));

    return (
        <li className={ms_item.item}>
            <section className={ms_item.item__left}>
                <img src={window.URL.createObjectURL(img)} alt="picture.png" />
                <section className={ms_item.item__left__info}>
                    <h3>title</h3>
                    <span>513KB</span>
                </section>
            </section>
            <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className={ms_item.basket}

            onClick={(e)=>removeItem(e,img)}
            >
                <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>

        </li>
    )
}