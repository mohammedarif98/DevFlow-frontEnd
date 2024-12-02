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
        updateUserStart(state){
            state.loading = true;
        },
        updateUserSuccess(state, action: PayloadAction<string>){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        updateUserFail(state, action: PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        },
    }
});



export const { login, logout, updateUserStart, updateUserSuccess, updateUserFail } = userSlice.actions;
export default userSlice.reducer; 