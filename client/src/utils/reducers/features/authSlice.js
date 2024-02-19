import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state) => {
      
      state.value += 1
    },
    signUp: (state) => {
      state.value -= 1
    },
    logout: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { login, signUp, logout } = authSlice.actions

export default authSlice.reducer