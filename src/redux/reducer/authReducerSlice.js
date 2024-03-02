import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  group: 0,
  id: 0,
  token: '',
  username: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        group: payload.group,
        id: payload.id,
        token: payload.token,
        username: payload.username
      };
    },
    // eslint-disable-next-line no-unused-vars
    logOut: (state, action) => initialState
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth;
export const selectCurrentUserName = state => state.auth.username;
export const selectCurrentToken = state => state.auth.token;
export const selectCurrentGroup = state => parseInt(state.auth.group);
export const selectCurrentUserId = state => state.auth.id;
