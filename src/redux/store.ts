import React from 'react';
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { PhotoState } from './features/photos/Photoslice';
import PhotosSliceReducer from './features/photos/Photoslice';
import { userSlice } from './features/User/UserSlice';
import commonSliceReducer from './features/common/commonSlice';
import modalReducer from './features/modal/modalSlice';
import flagSlicerReducer from './features/flags/flagsSlice';

import benefitSlicerReducer from './features/benefit/benefitSlice';
import historySlicerReducer from './features/queryHistory/historySlice';


export type AppThunk = ThunkAction<void, PhotoState, unknown, Action<string>>;

const store = configureStore({
  reducer: {
    photosStore: PhotosSliceReducer,
    user: userSlice.reducer,
    // anyOtherStore: anyOtherSlice,
    common: commonSliceReducer,
    modal: modalReducer,

    //
    history: historySlicerReducer,
    flag: flagSlicerReducer,
    benefit: benefitSlicerReducer,
    //
  },
});

export { store };
