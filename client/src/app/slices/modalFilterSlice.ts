import {createSlice} from '@reduxjs/toolkit';

export interface IModalFilter{
    isOpenCategoryMenu:boolean;
    isOpenPriceMenu:boolean;
    isOpenAddMenu_1:boolean;
    isOpenAddMenu_2:boolean;
}

const initialState = {
    isOpenCategoryMenu:true,
    isOpenPriceMenu:true,
    isOpenAddMenu_1:true,
    isOpenAddMenu_2:true
}

export const modalFilterSlice = createSlice({
    name:"modalFilter",
    initialState,
    reducers:{
        switchCategoryMenu:(state,action)=>{
            state.isOpenCategoryMenu=!state.isOpenCategoryMenu;
        },
        switchPriceMenu:(state,action)=>{
            state.isOpenPriceMenu=!state.isOpenPriceMenu;
        },
        switchAddMenu1:(state,action)=>{
            state.isOpenAddMenu_1=!state.isOpenAddMenu_1;
        },
        switchAddMenu2:(state,action)=>{
            state.isOpenAddMenu_2=!state.isOpenAddMenu_2;
        }
    }
})


export const { switchCategoryMenu,switchPriceMenu,switchAddMenu1,switchAddMenu2} = modalFilterSlice.actions;

export default modalFilterSlice.reducer;