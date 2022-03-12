import { createSlice } from "@reduxjs/toolkit";

export const responseSlince = createSlice({
  name: "response",
  initialState: {
    responseUrl: "",
    responseMethod: "",
    responseBody: "",
    responseHeader: {},
    statusCode: 0,
    statusText: "",
    time: "",
  },
  reducers: {
    setResponseUrl: (state, action) => {
      state.responseUrl = action.payload;
    },
    setResponseMethod: (state, action) => {
      state.responseMethod = action.payload;
    },
    setResponseBody: (state, action) => {
      state.responseBody = action.payload;
    },
    setResponseHeader: (state, action) => {
      state.responseHeader = action.payload;
    },
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    setStatusText: (state, action) => {
      state.statusText = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

// Action creators
export const {
  setResponseBody,
  setResponseHeader,
  setStatusCode,
  setStatusText,
  setTime,
  setResponseUrl,
  setResponseMethod,
} = responseSlince.actions;
export default responseSlince.reducer;
