import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface benefitState {
    list1: any,
    list2: any,
}

const initialState : benefitState = {
    list1 :  [],
    list2 : []
}


const benefitSlice = createSlice({
    name: 'benefit',
    initialState,
    reducers: {
        setListData : (state, { payload}: PayloadAction<any>) => {
            state.list1 = payload;
        },
        setListData2 : (state, { payload}: PayloadAction<any>) => {
            state.list2 = payload;
        },
    }
})


export const { setListData } = benefitSlice.actions;
export const { setListData2} = benefitSlice.actions;


export default benefitSlice.reducer;

export const benefitSelector = (state: { benefit: benefitState}) => state.benefit