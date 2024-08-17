import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
    name:"photo",
    initialState:{
        items:[]
    },
    reducers:{
        setPhoto:(state,action) =>{
            state.items = action.payload
        },
          addPhoto:(state,action)=>{
            // console.log(action);
            state.items.push(action.payload);
          }
    }
});
export const{addPhoto ,setPhoto}=photoSlice.actions;
export default photoSlice.reducer