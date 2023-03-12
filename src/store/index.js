import { configureStore } from '@reduxjs/toolkit';
import hashReducer from './hash';

export default configureStore({
  reducer: {
    hash: hashReducer,
  },
});
