import { createSlice } from '@reduxjs/toolkit';

export const hashSlice = createSlice({
  name: 'hash',
  initialState: {
    value: '',
  },
  reducers: {
    updateHash: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHash } = hashSlice.actions;

export default hashSlice.reducer;
