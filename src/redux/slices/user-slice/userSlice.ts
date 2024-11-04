import { createSlice,PayloadAction } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';




interface UserState {
    user: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //* ---------- Login actions -----------
        login(state, action: PayloadAction<string>){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        //* ------------ Logout action ----------
        logout(state){
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        //* ---------- Loading and Error actions -----------
        // setLoading(state, action: PayloadAction<boolean>) {
        //     state.loading = action.payload;
        // },
        // setError(state, action: PayloadAction<string | null>) {
        //     state.error = action.payload;
        // },
    }
});



export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 