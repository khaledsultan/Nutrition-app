// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers"; // Import your rootReducer
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  scannedBarcode: null,
};
const barcodeSlice = createSlice({
  name: "barcode",
  initialState,
  reducers: {
    scanBarcode: (state, action) => {
      state.scannedBarcode = action.payload;
    },
  },
});
const rootReducer = barcodeSlice.reducer;
const store = configureStore({
  reducer: rootReducer,
});
// export const { scanBarcode } = barcodeSlice.actions;
export default store;
