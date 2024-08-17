
import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './photoSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        photos: photosReducer,
        user:userSlice
    },
});

export default store;
