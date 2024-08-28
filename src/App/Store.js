import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice'

const  Store=configureStore({
    reducer:{
        themeChanger:themeReducer,
    }
})
export default Store