import { createSlice } from "@reduxjs/toolkit";

export const requestSlince = createSlice({
  name: "request",
  initialState: {
    options: {
      method: "GET",
      url: "",
      data: "",
      headers: {},
    },
  },
  reducers: {
    setUrl: (state, action) => {
      state.options.url = action.payload;
    },
    setMethod: (state, action) => {
      state.options.method = action.payload;
    },
    setBody: (state, action) => {
      state.options.data = action.payload;
    },
    setHeader: (state, action) => {
      state.options.headers = action.payload;
    },
  },
});

// Action creators
export const { setUrl, setMethod, setHeader, setBody } = requestSlince.actions;
export default requestSlince.reducer;
