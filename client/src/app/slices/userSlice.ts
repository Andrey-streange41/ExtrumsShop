import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IUser } from "../../types/users.types";
import avatar from "../../assets/images/Avatar.png";
import { updateUserById, getUserById } from "../../http/userAPI.ts";
import jwt_decode from "jwt-decode";

interface IUserState {
  userData: IUser;
  isAuth: boolean;
  rememberMe: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

interface IStoreData {
  firstname?: string;
  lastname?: string;
  email?: string;
  tel?: string;
  id?: string;
}

const initialState: IUserState = {
  userData: {
    firstname: null,
    lastname: null,
    email: null,
    password: "",
    tel: null,
    avatar: avatar,
    updateAgrements: false,
    id: null,
  },
  
  isAuth: false,
  rememberMe: false,
  loading: "idle",
  currentRequestId: undefined,
  error: null,
};

export const updateUser = createAsyncThunk(
  "users/update",
  async function ( userData, { rejectWithValue }) {
    try {
      const data = await updateUserById(userData);
      return data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getUserByIdChunck = createAsyncThunk(
  "user/getByid",
  async function (id: string, { rejectWithValue }) {
    try {
      const user = await getUserById(id);

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state: IUserState, action) => {
      state.userData = { ...action.payload };
    },
    setAuth: (state: IUserState, action) => {
      state.isAuth = action.payload;
    },
    setRemember: (state: IUserState, action: any) => {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: {
    [String(updateUser.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(updateUser.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.userData = { ...state.userData, ...action.payload };
        state.currentRequestId = undefined;
      }
    },
    [String(updateUser.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [String(getUserByIdChunck.pending)]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [String(getUserByIdChunck.fulfilled)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.userData = {
          ...state.userData,
          email: action.payload.user.email,
          tel: action.payload.userInfo.telphone,
          firstname:action.payload.userInfo.firstname,
          lastname:action.payload.userInfo.lastname,
          password:'',
          avatar:`http://localhost:5000/` + action.payload.userInfo.avatar
        };
        state.currentRequestId = undefined;
      }
    },
    [String(getUserByIdChunck.rejected)]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { setUserData, setAuth, setRemember } = userSlice.actions;
export default userSlice.reducer;
