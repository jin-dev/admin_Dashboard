import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
	isModal: boolean;
	body: any,
	footer?: any,
	handleConfirm?: () => void;

}

const initialState: any = {
	isModal: false,
	body: null,
	footer: 'close',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		showModal: (state, { payload }: PayloadAction<any>) => {
			return {
				...payload,
				isModal: true,
			}
		},
		closeModal: (state) => {
			state.isModal = false;
		},
		setModal: (state, { payload }: PayloadAction<any>) => {
			return {
				...payload,
				isModal: !state.isModal,
			}
		},
	},
});

export const { showModal, closeModal, setModal } = modalSlice.actions;

export default modalSlice.reducer;

export const ModalSelector = (state: { modal: ModalState }) => state.modal;
