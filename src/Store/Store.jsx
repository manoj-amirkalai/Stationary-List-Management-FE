import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from './Slice.jsx';

const store = configureStore({
reducer:{
    store:SliceReducer
}
})

export default store;