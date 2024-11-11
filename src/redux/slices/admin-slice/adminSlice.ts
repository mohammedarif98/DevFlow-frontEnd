import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
    admin: any | null; 
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        //* ----------- login actions -----------
        login(state, action: PayloadAction<any>){
            state.admin = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        //* ----------- logout actions -----------
        logout(state){
            state.admin = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    }
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;