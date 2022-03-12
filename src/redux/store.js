import { configureStore } from "@reduxjs/toolkit";
import requestSlince from "@redux/slince/requestSlince";
import responseSlince from "@redux/slince/responseSlince";

export default configureStore({
  reducer: {
    request: requestSlince,
    response: responseSlince,
  },
});
