import { createSlice } from "@reduxjs/toolkit";
const themeSlice=createSlice({
    name:"themeColor",
    initialState:{
        defaultTheme:"dark"
    },
    reducers:{
        toggleTheme(state){
            state.defaultTheme=state.defaultTheme==="light"?"dark":"light";
        }
    }
})

export const {toggleTheme}=themeSlice.actions;
export default themeSlice.reducer;