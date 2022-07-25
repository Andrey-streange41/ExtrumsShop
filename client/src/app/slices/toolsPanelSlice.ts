import {createSlice} from '@reduxjs/toolkit';

export interface IToolsPanel{
    isActiveViewMode:boolean;
    isActivePriceMenu:boolean;
    isActiveFilterMenu:boolean;
}

const initialState : IToolsPanel = {
    isActiveViewMode:false,
    isActivePriceMenu:false,
    isActiveFilterMenu:false
}

const toolsPanelSlice = createSlice({
    initialState,
    name:"toolsPanel",
    reducers:{
        switchMode:(state,action)=>{
            state.isActiveViewMode = !state.isActiveViewMode;
        },
        switchPriceMenu:(state,action)=>{
            state.isActivePriceMenu = !state.isActivePriceMenu;
        },
        switchFilterMenu:(state,action)=>{
            state.isActiveFilterMenu = !state.isActiveFilterMenu;
            console.log('ok');
            
        }
    }
})

export const {switchMode,switchPriceMenu,switchFilterMenu } = toolsPanelSlice.actions;

export default toolsPanelSlice.reducer;