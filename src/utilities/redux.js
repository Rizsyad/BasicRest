import {
  setUrl,
  setMethod,
  setHeader,
  setBody,
} from "@redux/slince/requestSlince";

import {
  setResponseBody,
  setResponseHeader,
  setStatusCode,
  setStatusText,
  setTime,
  setResponseUrl,
  setResponseMethod,
} from "@redux/slince/responseSlince";

export const getRequest = (state) => state.request.options;
export const getResponse = (state) => state.response;

export const getSelector = (state, select, stateSelector = "") => {
  const requestSlince = getRequest(state);
  const responseSlince = getResponse(state);

  switch (select) {
    case "request":
      if (stateSelector !== "") return requestSlince[stateSelector];
      return requestSlince;
    case "response":
      if (stateSelector !== "") return responseSlince[stateSelector];
      return responseSlince;
    default:
      break;
  }
};

export const setSelector = (dispatch, select, stateSelector, data) => {
  switch (select) {
    case "request":
      switch (stateSelector) {
        case "url":
          dispatch(setUrl(data));
          break;
        case "method":
          dispatch(setMethod(data));
          break;
        case "header":
          dispatch(setHeader(data));
          break;
        case "body":
          dispatch(setBody(data));
          break;
        default:
          break;
      }
      break;
    case "response":
      switch (stateSelector) {
        case "url":
          dispatch(setResponseUrl(data));
          break;
        case "method":
          dispatch(setResponseMethod(data));
          break;
        case "body":
          dispatch(setResponseBody(data));
          break;
        case "header":
          dispatch(setResponseHeader(data));
          break;
        case "code":
          dispatch(setStatusCode(data));
          break;
        case "codeText":
          dispatch(setStatusText(data));
          break;
        case "time":
          dispatch(setTime(data));
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
