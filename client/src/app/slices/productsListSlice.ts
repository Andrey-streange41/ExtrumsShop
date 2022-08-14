import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IComment, IProduct } from "../../types/favoriteList.types";
import { tmpProductList } from "../../localDB/index.ts";
import {
  addComment,
  getProducts,
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
  comments?: IComment[];
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
  comments: [],
};

export const getProductsThunk = createAsyncThunk<IProduct[]>(
  "get/product",
  async (_,{rejectWithValue}) => {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
      return error.message;
    }
  }
);
interface ICommunication{
  name:string;
  id:number;
}
export const updateProductsThunk = createAsyncThunk<IProduct[],ICommunication>(
  "update/product",
  async function (data, { rejectWithValue }) {
    try {
      const products = await updateComunicationByProductId(data);
      return products;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
      return error.message;
    }
  }
);
interface IFavoriteAdding{
  userId:number;
  productId:number;
}
export const addToFavoritesThunk = createAsyncThunk<IProduct[],IFavoriteAdding>(
  "add/favorites",
  async function (data, { rejectWithValue }) {
    try {
      const products = await addToFavorites(data);
      return products;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
      return error.message;
    }
  }
);
export const removeFromFavoriteListThunk = createAsyncThunk<IProduct[],IFavoriteAdding>(
  "remove/favorites",
  async function (data, { rejectWithValue }) {
    try {
      const responce = await removeFromFavorites(data);
      return responce;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
      return error.message;
    }
  }
);
export const getFavorListThunk = createAsyncThunk<IProduct[],number>(
  "remove/favorites",
  async function (userId, { rejectWithValue }) {
    try {
      const responce = await getFavoriteList(userId);
      return responce;
    } catch (error) {
      console.log(error.message);
      rejectWithValue(error);
      return error.message;
    }
  }
);
interface IAddComment{
  comment:IComment;
  productId:number;
  userId:number;
}

export const addCommentToProductThunk = createAsyncThunk<IProduct,IAddComment>(
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

export const removeCommentThunk = createAsyncThunk<IProduct,number>('remove/comment',
async (id,{rejectWithValue}) => {
  try {
    const reponce = await removeComment(id);
    return responce;
  } catch (error) {
     console.log(error.message);
     rejectWithValue(error);
     return error.message;
  }
}
)

const productsListSlice = createSlice({
  name: "productsList",
  initialState,
  reducers: {
    setFilteredList: (state, action: PayloadAction<IProduct[]>) => {
      if (action.payload) state.filteredList = [...action.payload];
    },
    setProductsList: (state, action: PayloadAction<IProduct[]>) => {
      if (action.payload) state.testList = [...action.payload];
    },
    setFavoriteList: (state, action: PayloadAction<IProduct[]>) => {
      if (action.payload) state.favoriteList = [...action.payload];
    },
    setFavorFilterList: (state, action: PayloadAction<IProduct[]>) => {
      if (action.payload) state.favorFilterList = action.payload;
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
        state.loading = "failed";
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
        if (action.payload) {
          state.testList = [...action.payload];
          const coms = action.payload.filter(
            (el) =>
              el.userComunications.find((el) => el.name === "favorites")
                .isActive
          );
          state.favoriteList = coms;
        }
        state.currentRequestId = undefined;
      }
    },
    [String(updateProductsThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "failed";
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
        if(action.payload) state.favoriteList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(addToFavoritesThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "failed";
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
        if(action.payload) state.favoriteList = [...action.payload];
        state.currentRequestId = undefined;
      }
    },
    [String(removeFromFavoriteListThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "failed";
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
        state.loading = "failed";
        state.currentRequestId = undefined;
      }
    },

    [String(addCommentToProductThunk.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(addCommentToProductThunk.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.comments = action.payload.comments;
        const replaceIndex = state.testList?.findIndex(
          (el) => el.id === action.payload.id
        );
        if (replaceIndex)
          state.testList = state.testList?.splice(
            replaceIndex,
            1,
            action.payload
          );
        state.loading = "idle";
        state.currentRequestId = undefined;
      }
    },
    [String(addCommentToProductThunk.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && requestId === state.currentRequestId) {
        state.error = action.payload;
        state.loading = "failed";
        state.currentRequestId = undefined;
      }
    },
  },
});

export const {
  setFilteredList,
  setProductsList,
  setFavoriteList,
  setFavorFilterList,
} = productsListSlice.actions;

export default productsListSlice.reducer;
