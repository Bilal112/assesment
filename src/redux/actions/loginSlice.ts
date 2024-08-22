import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  id?: string;
  name?: string;
  email?: string;
  access_token?: string;
  // Add other user-specific fields here
}

interface LoginState {
  token: string | null;
  user: User;
  loggedIn: boolean;
}

const initialState: LoginState = {
  token: null,
  user: {},
  loggedIn: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const {payload} = action;
      console.log(payload, '=');
      state.user = payload;
      state.token = payload.access_token || null;
      state.loggedIn = true;
    },
    updateLogin: (state, action: PayloadAction<Partial<User>>) => {
      const {payload} = action;
      state.token = payload.access_token || state.token;
      state.user = {
        ...state.user,
        ...payload,
      };
      state.loggedIn = !!payload.access_token;
    },
  },
});

const {addUser, updateLogin} = loginSlice.actions;
const LoginReducer = loginSlice.reducer;

export {addUser, updateLogin, LoginReducer};
export default loginSlice;
