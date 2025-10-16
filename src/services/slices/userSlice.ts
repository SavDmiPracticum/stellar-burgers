import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser;
  loginUserError: null | SerializedError;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: {
    name: '',
    email: ''
  },
  loginUserError: null
};

const setToken = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (data) => {
    const res = await registerUserApi(data);
    const { user, refreshToken, accessToken } = res;
    setToken(accessToken, refreshToken);
    return user;
  }
);

export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/loginUser',
  async (data) => {
    const res = await loginUserApi(data);
    const { user, refreshToken, accessToken } = res;
    setToken(accessToken, refreshToken);
    return user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const fetchUser = createAsyncThunk<TUser, void>(
  'user/fetchUser',
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserError = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserError = action.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserError = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserError = action.error;
      });
  }
});

export const { setIsAuthChecked } = userSlice.actions;
export const { getIsAuthChecked } = userSlice.selectors;

export default userSlice.reducer;
