import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IComment, IProduct } from "../../types/favoriteList.types";
import { tmpProductList } from "../../localDB/index.ts";
import {
  addComment,
  getProducts,
  updateProductById,
  addToFavorites,
  updateComunicationByProductId,
  removeFromFavorites,
  getFavoriteList,
} from "../../http/productApi.ts";
import { AxiosError } from "axios";

export interface IProductsList {
  favoriteList: IProduct[];
  productsList: IProduct[];
  filteredList: IProduct[];
  favorFilterList: IProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  currentRequestId: string | undefined;
  error: SerializedError | null;
  testList?: any[];
  comments?:IComment[];
}

const initialState: IProductsList = {
  favoriteList: [],
  productsList: tmpProductList,
  filteredList: [],
  favorFilterList: [],
  loading: "idle",
  currentRequestId: undefined,
  error: null,
  testList: [],
  comments:[]
};

export const getProductsThunk = createAsyncThunk(
  "get/product",
  async function (_, { rejectWithValue }) {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateProductsThunk = createAsyncThunk(
  "update/product",
  async function (data, { rejectWithValue }) {
    try {
      const products = await updateComunicationByProductId(data);
      if(products instanceof AxiosError){
        throw new Error('Reques faild !')
      }
      return products;
    } catch (error) {
      rejectWithValue(error);
      return error;
    }
  }
);

export const addToFavoritesThunk = createAsyncThunk(
  "add/favorites",
  async function (data, { rejectWithValue }) {
    try {
      const products = await addToFavorites(data);
      return products;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
    }
  }
);

export const removeFromFavoriteListThunk = createAsyncThunk(
  "remove/favorites",
  async function (data, { rejectWithValue }) {
    try {
      const responce = await removeFromFavorites(data);
      return responce;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
    }
  }
);

export const getFavorListThunk = createAsyncThunk(
  "remove/favorites",
  async function (userId, { rejectWithValue }) {
    try {
      const responce = await getFavoriteList(userId);
      return responce;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
    }
  }
);

export const addCommentToProductThunk = createAsyncThunk(
  "add/comment",
  async function (data, { rejectWithValue }) {
    try {
      const responce = await addComment(data);
      return responce;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
    }
  }
);

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    setFilteredList: (state, action) => {
      state.filteredList = [...action.payload];
    },
    setProductsList: (state, action) => {
      state.productsList = [...action.payload];
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = [...action.payload];
    },
    setFavorFilterList: (state, action) => {
      state.favorFilterList = action.payload;
    },
  },
  extraReducers: {
    [String(getProductsThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(getProductsThunk.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.loading = "idle";
        state.testList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(getProductsThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },

    [String(updateProductsThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(updateProductsThunk.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.loading = "idle";
        state.testList = [...action.payload];
        const coms = action.payload.filter(el=>el.userComunications.find(el=>el.name ==='favorites').isActive);
        state.favoriteList = coms;
        state.currentRequestId = undefined;
      }
    },
    [String(updateProductsThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [String(addToFavoritesThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(addToFavoritesThunk.fulfilled)]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.favoriteList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(addToFavoritesThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [String(removeFromFavoriteListThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(removeFromFavoriteListThunk.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.loading = "idle";
        state.favoriteList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(removeFromFavoriteListThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [String(getFavorListThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(getFavorListThunk.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.loading = "idle";

        state.favoriteList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(getFavorListThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },


    [String( addCommentToProductThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String( addCommentToProductThunk.fulfilled)]: (state, action) => {
      
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.comments = action.payload.comments;
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [String( addCommentToProductThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "idle";
        state.currentRequestId = undefined;
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
  setProductsList,
  setFavoriteList,
  setFavorFilterList,
  setComment,
} = productsListSlice.actions;

export default productsListSlice.reducer;
