import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constant";

export const intialgetReducer = createAsyncThunk("get/items", async () => {
  try {
    const response = await axios.get(
      `${API_URL}/getallitems`
    );
    return response.data.items; // Assuming the API returns an array of items
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Propagate the error to be handled in the extraReducers
  }
});

const storeSlice = createSlice({
  name: "store",
  initialState: {
    items: [],
    getLoader: false,
    postLoader: false,
    putLoader: false,
    deleteLoader: false,
    admin:false
  },
  reducers:{
   adminLogIn:(state,action)=>{
      state.admin = action.payload;
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(intialgetReducer.pending, (state) => {
        console.log("Fetching items...");
        // Optionally, you can set a loading state here
        state.getLoader = true;
      })
      .addCase(intialgetReducer.fulfilled, (state, action) => {
        state.items = action.payload;
        state.getLoader = false;
      })
      .addCase(intialgetReducer.rejected, (state, action) => {
        console.error("Failed to fetch items:", action.error);
        state.getLoader = false;
      });
  },
});
export const { adminLogIn } = storeSlice.actions;
export default storeSlice.reducer;
