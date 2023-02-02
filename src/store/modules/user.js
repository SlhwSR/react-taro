import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const userfactory = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {},
    mapList: [],
  },
  reducers: {
    // add: (state, action) => {
    //   state.goodlist.push(action.payload);
    // },
    // deleteOne: (state, action) => {
    //   // console.log("哈哈"+ action.payload);
    //   state.goodlist.splice(action.payload - 1, 1);
    // },
    // updateOne: (state, action) => {
    //   state.goodlist[action.payload.key - 1] = action.payload;
    // },
    save: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export const { save } = userfactory.actions;

export default userfactory.reducer;
