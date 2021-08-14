import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 2021.03.10
// Sample coding으로 fake 데이터 사용해서 Redux tool kit 를 연동해 로그인 및 회원가입 구현
// 아래 부분은 앞으로 해야 하는것들 TODO
// fetch --> axios 만든후 --> Service 폴더 provider에 통합하기
//// js --> ts (Done 2021.03.15) 향후 상세 타입 지정은 필요

export interface UserState {
  user: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  user: '',
  email: '',
  password: '',
};

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await fetch(`/api/v1/partner/login_partner`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
  
      if (data.code === 200) {
        // console.log("The index of:", email.substring(0, email.indexOf('@')));
        sessionStorage.setItem(
          'userEmail',
          email.substring(0, email.indexOf('@')),
        );
        sessionStorage.setItem('isLogin', 'success');
        return data;
      } else {
        alert(data.msg);
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    const response = await fetch(`/api/v1/partner/logout_partner`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.code === 200) {
      sessionStorage.removeItem('isLogin');
      return data;
    } else {
      alert(data.msg);
    }
    // return thunkAPI(data);
  } catch (e) {
    console.log('Error', e.response.data);
    // thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: sessionStorage.getItem('userEmail'),
    isFetching: false,
    isSuccess: sessionStorage.getItem('isLogin') === 'success' ? true : false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.email = '';
      return state;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.fulfilled, (state: any, { payload }: any) => {
        //  state.email = payload.email;
        state.email = sessionStorage.getItem('userEmail');
        state.username = '';
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        return state;
      })
      .addCase(loginUser.rejected, (state: any, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(loginUser.pending, (state: any) => {
        state.isFetching = true;
      })

      .addCase(logoutUser.fulfilled, (state: any, { payload }: any) => {
        state.isSuccess = false;
      });
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: { user: UserState }) => state.user;
