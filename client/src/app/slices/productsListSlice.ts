import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/favoriteList.types";
import { tmpProductList } from "../../localDB/index.ts";

export interface IProductsList {
  favoriteList: IProduct[];
  productsList: IProduct[];
  filteredList: IProduct[];
  favorFilterList: IProduct[];
}

const initialState: IProductsList = {
  favoriteList: localStorage.getItem("favorList")
    ? JSON.parse(localStorage.getItem("favorList"))
    : [],
  productsList: tmpProductList,
  filteredList: [],
  favorFilterList:[]
};

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favoriteList = [
        ...state.favoriteList,
        { ...action.payload, isFavor: true },
      ];
      const defaulListEl = state.productsList
        .find((el) => el.id === action.payload.id)
        ?.userComunication.find((el) => el.name === "favorite");
      if (defaulListEl) {
        defaulListEl.isActive = true;
        ++defaulListEl.amount;
      }
      const filterListEl = state.filteredList
        .find((el) => el.id === action.payload.id)
        ?.userComunication.find((el) => el.name === "favorite");
      if (filterListEl) {
        filterListEl.isActive = true;
        ++filterListEl.amount;
      }
      const filterFavorListEl = state.favorFilterList
        .find((el) => el.id === action.payload.id)
        ?.userComunication.find((el) => el.name === "favorite");
      if (filterFavorListEl) {
          filterFavorListEl.isActive = true;
        ++filterFavorListEl.amount;
      }
    },
    removeFromFavoriteList: (state, action) => {
      state.favoriteList = state.favoriteList.filter(
        (i) => i.title !== action.payload.title
      );
      state.favorFilterList = state.favorFilterList.filter(
        (i) => i.title !== action.payload.title
      );

      const prodList = state.productsList.find(
        (el) => el.id === action.payload.id
      );
      const prodFavor = prodList?.userComunication?.find(
        (el) => el.name === "favorite"
      );
      if (prodFavor) {
        prodFavor.isActive = false;
        --prodFavor.amount;
      }
      const favorList = state.favoriteList.find(
        (el) => el.id === action.payload.id
      );
      const favorFavor = favorList?.userComunication?.find(
        (el) => el.name === "favorite"
      );
      if (favorFavor) {
        favorFavor.isActive = false;
        --favorFavor.amount;
      }
      const filterList = state.filteredList.find(
        (el) => el.id === action.payload.id
      );
      const filtFavor = filterList?.userComunication?.find(
        (el) => el.name === "favorite"
      );
      if (filtFavor) {
        filtFavor.isActive = false;
        --filtFavor.amount;
      }
      const filterFavorL = state.favorFilterList.find(
        (el) => el.id === action.payload.id
      );
      const filtFavCom = filterFavorL?.userComunication?.find(
        (el) => el.name === "favorite"
      );
      if (filtFavCom) {
        filtFavCom.isActive = false;
        --filtFavCom.amount;
      }
    },
    setFilteredList: (state, action) => {
      state.filteredList = [...action.payload];
    },
    setProductsList: (state, action) => {
      state.productsList = [...action.payload];
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = [...action.payload];
    },
    setFavorFilterList:(state,action)=>{
      state.favorFilterList = action.payload;
    },
    likeCliked: (state, action) => {
      const element = state.productsList.find((el) => el.id === action.payload);
      const filteredListElement = state.filteredList.find(
        (el) => el.id === action.payload
      );
      const filteredListLikeCom = filteredListElement?.userComunication.find(
        (el) => el.name === "like"
      );
      const filtListDislikeCom = filteredListElement?.userComunication.find(
        (el) => el.name === "dislike"
      );
      const elementLikeCommunication = element.userComunication.find(
        (el) => el.name === "like"
      );
      const elementDislikeCom = element.userComunication.find(
        (el) => el.name === "dislike"
      );
      const favoriteListElement = state.favoriteList.find(
        (el) => el.id === action.payload
      );
      const favorElementUserCom = favoriteListElement?.userComunication.find(
        (el) => el.name === "like"
      );
      const favorElDislikeCom = favoriteListElement?.userComunication.find(
        (el) => el.name === "dislike"
      );

      const favorFilterEl = state.favorFilterList.find(
        (el) => el.id === action.payload
      );
      const favorFilterElComLike = favorFilterEl?.userComunication.find(
        (el) => el.name === "like"
      );
      const favorFilterElComDislike = favorFilterEl?.userComunication.find(
        (el) => el.name === "dislike"
      );

      if (!elementLikeCommunication.isActive) {
        if (elementLikeCommunication.amount) {
          ++elementLikeCommunication.amount;
          elementLikeCommunication.isActive = true;
        }
        if (elementDislikeCom.isActive && elementDislikeCom.amount) {
          elementDislikeCom.isActive = false;
          --elementDislikeCom.amount;
        }
        if (filteredListLikeCom && filteredListLikeCom.amount) {
          ++filteredListLikeCom.amount;
          filteredListLikeCom.isActive = true;

          if (filtListDislikeCom.isActive && filtListDislikeCom.amount) {
            --filtListDislikeCom.amount;
            filtListDislikeCom.isActive = false;
          }
        }
        if (favorElementUserCom && favorElementUserCom.amount) {
          if (favorElDislikeCom.isActive) {
            favorElDislikeCom.isActive = false;
            --favorElDislikeCom.amount;
          }
          ++favorElementUserCom.amount;
          favorElementUserCom.isActive = true;
        }
        if (favorFilterElComLike && favorFilterElComLike.amount) {
          if (favorFilterElComDislike.isActive) {
            favorFilterElComDislike.isActive = false;
            --favorFilterElComDislike.amount;
          }
          ++favorFilterElComLike.amount;
          favorFilterElComLike.isActive = true;
        }
      } else {
        if (filteredListLikeCom && filteredListLikeCom.amount) {
          --filteredListLikeCom.amount;
          filteredListLikeCom.isActive = false;
        }
        if (favorElementUserCom && favorElementUserCom.amount) {
          --favorElementUserCom.amount;
          favorElementUserCom.isActive = false;
        }
        if (elementLikeCommunication && elementLikeCommunication.amount) {
          --elementLikeCommunication.amount;
          elementLikeCommunication.isActive = false;
        }
        if (favorFilterElComLike && favorFilterElComLike.amount) {
          --favorFilterElComLike.amount;
          favorFilterElComLike.isActive = false;
        }
      }
    },
    dislikeCliked: (state, action) => {
      const element = state.productsList.find((el) => el.id === action.payload);
      const elementDislikeCommunication = element.userComunication.find(
        (el) => el.name === "dislike"
      );
      const elementLikeCom = element.userComunication.find(
        (el) => el.name === "like"
      );

      const filteredListElement = state.filteredList.find(
        (el) => el.id === action.payload
      );
      const filteredListDislikeCom = filteredListElement?.userComunication.find(
        (el) => el.name === "dislike"
      );
      const filtListLikeCom = filteredListElement?.userComunication.find(
        (el) => el.name === "like"
      );

      const favoriteListElement = state.favoriteList.find(
        (el) => el.id === action.payload
      );
      const favorElDislikeCom = favoriteListElement?.userComunication.find(
        (el) => el.name === "dislike"
      );
      const favorElLikekeCom = favoriteListElement?.userComunication.find(
        (el) => el.name === "like"
      );

      const favoriteFilterListElement = state.favorFilterList.find(
        (el) => el.id === action.payload
      );
      const favorFilterElDislikeCom = favoriteFilterListElement?.userComunication.find(
        (el) => el.name === "dislike"
      );
      const favorFilterElLikekeCom = favoriteFilterListElement?.userComunication.find(
        (el) => el.name === "like"
      );

      if (!elementDislikeCommunication.isActive) {
        if (elementDislikeCommunication) {
          ++elementDislikeCommunication.amount;
          elementDislikeCommunication.isActive = true;

          if (elementLikeCom && elementLikeCom.isActive) {
            elementLikeCom.isActive = false;
            --elementLikeCom.amount;
          }
        }

        if (filteredListDislikeCom) {
          ++filteredListDislikeCom.amount;
          filteredListDislikeCom.isActive = true;

          if (filtListLikeCom && filtListLikeCom.isActive) {
            --filtListLikeCom.amount;
            filtListLikeCom.isActive = false;
          }
        }

        if (favorElDislikeCom) {
          if (favorElLikekeCom && favorElLikekeCom.isActive) {
            favorElLikekeCom.isActive = false;
            --favorElLikekeCom.amount;
          }
          ++favorElDislikeCom.amount;
          favorElDislikeCom.isActive = true;
        }
        if (favorFilterElDislikeCom) {
          if (favorFilterElLikekeCom && favorFilterElLikekeCom.isActive) {
            favorFilterElLikekeCom.isActive = false;
            --favorFilterElLikekeCom.amount;
          }
          ++favorFilterElDislikeCom.amount;
          favorFilterElDislikeCom.isActive = true;
        }
      } else {
        if (elementDislikeCommunication) {
          --elementDislikeCommunication.amount;
          elementDislikeCommunication.isActive = false;
        }
        if (filteredListDislikeCom) {
          --filteredListDislikeCom.amount;
          filteredListDislikeCom.isActive = false;
        }
        if (favorElDislikeCom) {
          --favorElDislikeCom.amount;
          favorElDislikeCom.isActive = false;
        }
        if (favorFilterElDislikeCom) {
          --favorFilterElDislikeCom.amount;
          favorFilterElDislikeCom.isActive = false;
        }
      }
    },
    viewsUp: (state, action) => {
      const productsListElement = state.productsList.find(
        (el) => el.id === action.payload
      );
      if(productsListElement)
        ++productsListElement.userComunication.find((el) => el.name === "views")
          .amount;
      const filteredListElement = state.filteredList.find(
        (el) => el.id === action.payload
      );
      if(filteredListElement)
        ++filteredListElement.userComunication.find((el) => el.name === "views")
          .amount;
      const favorListElement = state.favoriteList.find(
        (el) => el.id === action.payload
      );
      if(favorListElement)
        ++favorListElement.userComunication.find((el) => el.name === "views")
          .amount;
    },
    setComment:(state,action)=>{
      state.productsList.find(el=>el.id===action.payload.id).comments = [...state.productsList.find(el=>el.id===action.payload.id).comments,action.payload.data]
    }
  },
});

export const {
  addToFavorite,
  removeFromFavoriteList,
  setFilteredList,
  likeCliked,
  dislikeCliked,
  viewsUp,
  setProductsList,
  setFavoriteList,
  setFavorFilterList,
  setComment
} = productsListSlice.actions;

export default productsListSlice.reducer;
