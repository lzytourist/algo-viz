import {createSlice} from "@reduxjs/toolkit";
import {User} from "@/lib/types";

interface AuthState {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
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
        finishLoading: state => {
            state.isLoading = false;
        },
        startLoading: state => {
            state.isLoading = true;
        },
        setUser: (state, action) => {
            state.user = JSON.parse(action.payload) as User;
        }
    }
});

export const {
    setAuth,
    setLogout,
    startLoading,
    finishLoading,
    setUser
} = authSlice.actions;

export default authSlice.reducer;