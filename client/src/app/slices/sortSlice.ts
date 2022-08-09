import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    sortName:'Select',
    sortItemsForComment:[
        { name: "date", isActive: false },
        { name: "time", isActive: false },
        { name: "name", isActive: false },
      ],
    sortItemsForProducts:[
        { name: "likes", isActive: false },
        { name: "dislikes", isActive: false },
        { name: "views", isActive: false },
        { name: "price", isActive: false },
        { name: "favorites", isActive: false },
    ],
}

const sortSlice = createSlice({
    name:'sort',
    initialState,
    reducers:{
        setActiveItem:(state,action)=>{
            for (let i = 0; i < state.sortItemsForComment.length; i++) {
                const element = state.sortItemsForComment[i];
                if(element.name===action.payload.name)
                {
                    element.isActive = !element.isActive;
                    continue;
                }
                element.isActive = false;
            }
            state.sortName = action.payload.name;
        },
        setSortedList:(state,action)=>{
            state.sortedList = action.payload;
        }
    }
})

export const {setActiveItem,setSortedList}=sortSlice.actions;
export default sortSlice.reducer;