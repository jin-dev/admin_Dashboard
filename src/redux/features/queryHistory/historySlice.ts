import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface queryState {
    historyData: object;
   
}

const initialState: queryState = {
    historyData: {},

}


const historySlice = createSlice ({
    name: 'history',
    initialState,
    reducers: {
        setHistoryData: (state, { payload }: PayloadAction<object>) => {
            state.historyData = payload;
        },
        clearHistoryData: state => {
            state.historyData = {};

            return state;
        },

     
    } 
});


export const { setHistoryData } = historySlice.actions;

export const { clearHistoryData} = historySlice.actions;

export default historySlice.reducer;

export const historySelector = (state: { history: queryState}) => state.history;
