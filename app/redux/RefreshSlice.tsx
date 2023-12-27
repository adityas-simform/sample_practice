import { createSlice } from "@reduxjs/toolkit";
import { Animated } from "react-native";

const initialState = {
  scale: new Animated.Value(1),
  rotate: null,
};

export const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    sacleRefresh: (state, action) => {
      state.scale = action.payload.y.interpolate({
        inputRange: [0, 500],
        outputRange: [1, 1.5],
      });
    },
    rotateRefresh: (state, action) => {
      state.rotate = action.payload.y.interpolate({
        inputRange: [0, 150],
        outputRange: ["0deg", "30deg"],
      });
    },
  },
});

export const { sacleRefresh, rotateRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
