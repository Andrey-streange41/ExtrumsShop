import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/favoriteList.types";
import { tmpProductList } from "../../localDB/index.ts";

export interface IProductsList {
  favoriteList: IProduct[];
  productsList: IProduct[];
  filteredList: IProduct[];
}

const initialState: IProductsList = {
  favoriteList: localStorage.getItem("favorList")
    ? JSON.parse(localStorage.getItem("favorList"))
    : [],
  productsList: tmpProductList,
  filteredList: [],
};

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favoriteList = [...state.favoriteList, action.payload];
      for (let i = 0; i < state.productsList.length; i++) {
        const element = state.productsList[i];
        if (element.id === action.payload.id) {
          element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].isActive = true;
          ++element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].amount;
        }
      }
      for (let i = 0; i < state.filteredList.length; i++) {
        const element = state.filteredList[i];
        if (element.id === action.payload.id) {
          element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].isActive = true;
          ++element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].amount;
        }
      }
    },
    removeFromFavoriteList: (state, action) => {
      state.favoriteList = state.favoriteList.filter(
        (i) => i.title !== action.payload.title
      );
      for (let i = 0; i < state.productsList.length; i++) {
        const element = state.productsList[i];
        if (element.id === action.payload.id) {
          element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].isActive = false;
          --element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].amount;
        }
      }
      for (let i = 0; i < state.favoriteList.length; i++) {
        const element = state.favoriteList[i];
        if (element.id === action.payload.id) {
          element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].isActive = false;
          --element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].amount;
        }
      }
      for (let i = 0; i < state.filteredList.length; i++) {
        const element = state.filteredList[i];
        if (element.id === action.payload.id) {
          element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].isActive = false;
          --element.userComunication[
            element.userComunication.findIndex((el) => el.name === "favorite")
          ].amount;
        }
      }
    },
    setFilteredList: (state, action) => {
      state.filteredList = [...action.payload];
    },
    setProductsList:(state, action) => {
      console.log(action.payload);
      
      state.productsList = [...action.payload];
    },
    likeCliked: (state, action) => {
      for (let i = 0; i < state.productsList.length; i++) {
        const element = state.productsList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = false;
          }
        }
      }
      for (let i = 0; i < state.filteredList.length; i++) {
        const element = state.filteredList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = false;
          }
        }
      }
      for (let i = 0; i < state.favoriteList.length; i++) {
        const element = state.favoriteList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "like")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex((el) => el.name === "like")
            ].isActive = false;
          }
        }
      }
    },
    dislikeCliked: (state, action) => {
      for (let i = 0; i < state.productsList.length; i++) {
        const element = state.productsList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "dislike")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = false;
          }
        }
      }
      for (let i = 0; i < state.filteredList.length; i++) {
        const element = state.filteredList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "dislike")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = false;
          }
        }
      }
      for (let i = 0; i < state.favoriteList.length; i++) {
        const element = state.favoriteList[i];
        if (element.id === action.payload) {
          if (
            !element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive
          ) {
            ++element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = true;
          } else {
            --element.userComunication[
              element.userComunication?.findIndex((el) => el.name === "dislike")
            ].amount;
            element.userComunication[
              element?.userComunication?.findIndex(
                (el) => el.name === "dislike"
              )
            ].isActive = false;
          }
        }
      }
    },
    viewsUp: (state, action) => {
      for (let i = 0; i < state.productsList.length; i++) {
        const element = state.productsList[i];
        if (element.id === action.payload)
          ++element.userComunication[
            element.userComunication.findIndex((el) => el.name === "views")
          ].amount;
      }
      for (let i = 0; i < state.filteredList.length; i++) {
        const element = state.filteredList[i];
        if (element.id === action.payload)
          ++element.userComunication[
            element.userComunication.findIndex((el) => el.name === "views")
          ].amount;
      }
      for (let i = 0; i < state.favoriteList.length; i++) {
        const element = state.favoriteList[i];
        if (element.id === action.payload)
          ++element.userComunication[
            element.userComunication.findIndex((el) => el.name === "views")
          ].amount;
      }
    },
  },
});

export const {
  addToFavorite,
  removeFromFavoriteList,
  setFilteredList,
  likeCliked,
  dislikeCliked,
  viewsUp,
  setProductsList
} = productsListSlice.actions;

export default productsListSlice.reducer;
