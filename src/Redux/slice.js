import { createSlice } from "@reduxjs/toolkit";

const initialThemeColor = localStorage.getItem("mainColor") || "#6A4BFC";

const initialState = {
  value: "ltr",
  mode: "light",
  calendarDetails: "calendarDetails",
  organisationId: "",
  themeColor: initialThemeColor,
  companyId: null,
  hamburger: true,
  menuview: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    rtl: (state, action) => {
      state.value = action.payload;
    },
    mode: (state, action) => {
      state.mode = action.payload;
    },
    themeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    calendarDetails: (state, action) => {
      state.calendarDetails = action.payload;
    },
    organisationId: (state, action) => {
      state.organisationId = action.payload;
    },
    companyIdSet: (state, action) => {
      state.companyId = action.payload;
    },
    hamburger: (state, action) => {
      state.hamburger = action.payload;
    },
    menuview: (state, action) => {
      state.menuview = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  rtl,
  mode,
  themeColor,
  calendarDetails,
  organisationId,
  companyIdSet,
  hamburger,
  menuview,
} = layoutSlice.actions;

export default layoutSlice.reducer;
