import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import {getComments}from  '../../http/productApi.ts';


export const getCommentsThunk = createAsyncThunk(
    'get/comments',
   async function(id,{rejectWithValue}) {
        try {
            const comments = await getComments(id);
            return comments;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

interface ICommentSlice
{
    error:SerializedError|null;
    loading:"idle" | "pending" | "succeeded" | "failed";
    currentRequestId:string|undefined;
    comments:[]
}

const initialState: ICommentSlice = {
    error:null,
    loading:'idle',
    currentRequestId:undefined,
    comments:[]
}

export const commentsSlice = createSlice(
    {
        name:'comments',
        initialState,
        reducers:{},
        extraReducers:{
            [String(getCommentsThunk.pending)]: (state, action) => {
                if (state.loading === "idle") {
                  state.loading = "pending";
                  state.currentRequestId = action.meta.requestId;
                }
              },
              [String(getCommentsThunk.fulfilled)]: (state, action) => {
                const { requestId } = action.meta;
                if (state.loading === "pending" && requestId === state.currentRequestId) {
                  state.loading = "idle";
                  state.comments = [...action.payload];
                  state.currentRequestId = undefined;
                }
              },
              [String(getCommentsThunk.rejected)]: (state, action) => {
                const { requestId } = action.meta;
                if (state.loading === "pending" && requestId === state.currentRequestId) {
                  state.error = action.payload;
                  state.loading = "idle";
                  state.currentRequestId = undefined;
                }
              }
        }
    }
) 


export default commentsSlice.reducer;