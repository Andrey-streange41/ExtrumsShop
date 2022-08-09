import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchPriceMenu } from "../../../app/slices/toolsPanelSlice.ts";
import ms from "./style.module.scss";
import ddd from "../../../assets/images/birdUp.png";
import birdDown from "../../../assets/images/birdDown.png";
import birdUp from "../../../assets/images/ddd.png";
import sortBlack from "../../../assets/images/sortBlack.png";
import { setActiveItem } from "../../../app/slices/sortSlice.ts";
import {setFavorFilterList ,setFilteredList,setFavoriteList ,setProductsList} from "../../../app/slices/productsListSlice.ts";



export const Sort = ({category}) => {
  const isActivePriceMenu = useSelector((s) => s.toolsPanel.isActivePriceMenu);
  const sortName = useSelector(s=>s.sort.sortName);
  const dispatch = useDispatch();

  return (
    <>
      <section
        onClick={(e) => {
          e.stopPropagation();
          dispatch(switchPriceMenu());
        }}
        className={
          !isActivePriceMenu
            ? ms.container__rectangle1
            : ms.container__rectangle1_v2
        }
      >
        <img src={!isActivePriceMenu ? ddd : sortBlack} alt="sort.png" />
        <section style={{textTransform:'capitalize'}}>{sortName}</section>
        <img src={!isActivePriceMenu ? birdUp : birdDown} alt="bird.png" />
        <ModalForSort
          category={category}
          isActive={isActivePriceMenu}
        />
      </section>
    </>
  );
};




const ModalForSort = ({ isActive ,category}) => {
    const modalCommentsItems= useSelector(s=>s.sort.sortItemsForComment);
    const modalProductsItems = useSelector(s=>s.sort.sortItemsForProducts);
    const [targetModalList,setTargetList] = useState([]);
    
    const filteredList = useSelector(s=>s.productsList.filteredList);
    const productsList = useSelector(s=>s.productsList.productsList);
    const favoriteList = useSelector(s=>s.productsList.favoriteList);
    const favorFilterList = useSelector(s=>s.productsList.favorFilterList);

    let sortFilteredList = [...filteredList];
    let sortProductList = [...productsList];
    let sortFavoriteList = [...favoriteList];
    let sortFavorFilterList=[...favorFilterList];
    let commentsSortedFilteredList = [];
    let commentsSortedProductsList = [];

    useEffect(()=>{
        setTargetList(category==='products'?modalProductsItems:modalCommentsItems)
    },[sortFilteredList,sortProductList])
    const dispatch = useDispatch();

    const sorting = (el) =>{
        dispatch(setActiveItem({name:el.name}));
        if(el.name === 'price'){
           sortFilteredList.sort((a,b)=>a.price-b.price);
           sortProductList.sort((a,b)=>a.price-b.price);
           sortFavoriteList.sort((a,b)=>a.price-b.price);
           sortFavorFilterList.sort((a,b)=>a.price-b.price);
        }
        else if(el.name === 'likes'){
             sortFilteredList.sort((a,b)=>a.userComunication.find(el=>el.name==='like').amount-b.userComunication.find(el=>el.name==='like').amount);
             sortProductList.sort((a,b)=>a.userComunication.find(el=>el.name==='like').amount-b.userComunication.find(el=>el.name==='like').amount);
             sortFavoriteList.sort((a,b)=>a.userComunication.find(el=>el.name==='like').amount-b.userComunication.find(el=>el.name==='like').amount);
             sortFavorFilterList.sort((a,b)=>a.userComunication.find(el=>el.name==='like').amount-b.userComunication.find(el=>el.name==='like').amount);
        }
        else if(el.name === 'dislikes'){
            sortFilteredList.sort((a,b)=>a.userComunication.find(el=>el.name==='dislike').amount-b.userComunication.find(el=>el.name==='dislike').amount);
            sortProductList.sort((a,b)=>a.userComunication.find(el=>el.name==='dislike').amount-b.userComunication.find(el=>el.name==='dislike').amount);
            sortFavoriteList.sort((a,b)=>a.userComunication.find(el=>el.name==='dislike').amount-b.userComunication.find(el=>el.name==='dislike').amount);
            sortFavorFilterList.sort((a,b)=>a.userComunication.find(el=>el.name==='dislike').amount-b.userComunication.find(el=>el.name==='dislike').amount);
          }
        else if(el.name === 'views'){
            sortFilteredList.sort((a,b)=>a.userComunication.find(el=>el.name==='views').amount-b.userComunication.find(el=>el.name==='views').amount);
            sortProductList.sort((a,b)=>a.userComunication.find(el=>el.name==='views').amount-b.userComunication.find(el=>el.name==='views').amount);
            sortFavoriteList.sort((a,b)=>a.userComunication.find(el=>el.name==='views').amount-b.userComunication.find(el=>el.name==='views').amount);
            sortFavorFilterList.sort((a,b)=>a.userComunication.find(el=>el.name==='views').amount-b.userComunication.find(el=>el.name==='views').amount);
          }
        else if(el.name === 'favorites'){
            sortFilteredList.sort((a,b)=>a.userComunication.find(el=>el.name==='favorite').amount-b.userComunication.find(el=>el.name==='favorite').amount);
            sortProductList.sort((a,b)=>a.userComunication.find(el=>el.name==='favorite').amount-b.userComunication.find(el=>el.name==='favorite').amount);
            sortFavoriteList.sort((a,b)=>a.userComunication.find(el=>el.name==='favorite').amount-b.userComunication.find(el=>el.name==='favorite').amount);
            sortFavorFilterList.sort((a,b)=>a.userComunication.find(el=>el.name==='favorite').amount-b.userComunication.find(el=>el.name==='favorite').amount);
        }
        else if(el.name === 'name'){
            for (let i = 0; i < sortFilteredList.length; i++) {
                let element = sortFilteredList[i];
                let commentsTmp = [...element.comments];
                commentsTmp.sort((a,b) => a.owner>b.owner?1:-1);
                element = {...element, comments:commentsTmp};
                commentsSortedFilteredList = [...commentsSortedFilteredList, element]
            }
            sortFilteredList=[...commentsSortedFilteredList]
            for (let i = 0; i < sortProductList.length; i++) {
              let element = sortProductList[i];
              let commentsTmp = [...element.comments];
              commentsTmp.sort((a,b) => a.owner>b.owner?1:-1);
              element = {...element, comments:commentsTmp};
              commentsSortedProductsList = [...commentsSortedProductsList, element]
          }
          sortProductList=[...commentsSortedProductsList];
            
        }
        else if(el.name === 'date'){
          for (let i = 0; i < sortFilteredList.length; i++) {
              let element = sortFilteredList[i];
              let commentsTmp = [...element.comments];
              commentsTmp.sort((a,b) => a.date.day>b.date.day?1:-1);
              element = {...element, comments:commentsTmp};
              commentsSortedFilteredList = [...commentsSortedFilteredList, element]
          }
          sortFilteredList=[...commentsSortedFilteredList]
          for (let i = 0; i < sortProductList.length; i++) {
            let element = sortProductList[i];
            let commentsTmp = [...element.comments];
            commentsTmp.sort((a,b) => a.date.day>b.date.day?1:-1);
            element = {...element, comments:commentsTmp};
            commentsSortedProductsList = [...commentsSortedProductsList, element]
        }
        sortProductList=[...commentsSortedProductsList];
      }
      else if(el.name === 'time'){
        for (let i = 0; i < sortFilteredList.length; i++) {
            let element = sortFilteredList[i];
            let commentsTmp = [...element.comments];
            commentsTmp.sort((a,b) => a.date.hour>b.date.day?1:-1);
            element = {...element, comments:commentsTmp};
            commentsSortedFilteredList = [...commentsSortedFilteredList, element]
        }
        sortFilteredList=[...commentsSortedFilteredList]
        for (let i = 0; i < sortProductList.length; i++) {
          let element = sortProductList[i];
          let commentsTmp = [...element.comments];
          commentsTmp.sort((a,b) => a.date.hour>b.date.day?1:-1);
          element = {...element, comments:commentsTmp};
          commentsSortedProductsList = [...commentsSortedProductsList, element]
      }
      sortProductList=[...commentsSortedProductsList];
    }
      dispatch(setFilteredList(sortFilteredList));
      dispatch(setProductsList(sortProductList));
      dispatch(setFavoriteList(sortFavoriteList));
      dispatch(setFavorFilterList(sortFavorFilterList));
    }

  return (
    <ul
      className={
        isActive ? ms.modalContainer + " " + ms.active : ms.modalContainer
      }
    >
      {targetModalList.map((el) => (
        <li
            key={Math.random()}
            onClick={() => sorting(el)
        }
          className={
            el.isActive
              ? ms.modalContainer__item + " " + ms.modalItemActive
              : ms.modalContainer__item
          }
        >
          <a style={{textTransform:'capitalize'}}>{el.name}</a>
        </li>
      ))}
    </ul>
  );
};
