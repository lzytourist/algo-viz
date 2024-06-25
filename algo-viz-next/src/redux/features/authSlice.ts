import {createSlice} from "@reduxjs/toolkit";
import {User} from "@/lib/types";

interface AuthState {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: state => {
            state.isAuthenticated = true;
        },
        setLogout: state => {
            state.isAuthenticated = false;
        },
        finishInitialLoading: state => {
            state.isLoading = false;
        },
        setUser: (state, action) => {
            state.user = JSON.parse(action.payload) as User;
        }
    }
});

export const {
    setAuth,
    setLogout,
    finishInitialLoading,
    setUser
} = authSlice.actions;

export default authSlice.reducer;