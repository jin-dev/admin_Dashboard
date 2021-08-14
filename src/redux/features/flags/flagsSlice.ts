import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface flagState {
    isButtonClicked : boolean;
}

const initialState : flagState = {
    isButtonClicked: false,
}

const flagsSlice= createSlice({
    name: 'flag',
    initialState,
    reducers: {
        setButtonClicked: (state, { payload }: PayloadAction<boolean>) => {
            state.isButtonClicked = payload;
        },
    }
});

export const { setButtonClicked } = flagsSlice.actions;

export default flagsSlice.reducer;

export const flagSelector = (state: { flag: flagState }) => state.flag;
