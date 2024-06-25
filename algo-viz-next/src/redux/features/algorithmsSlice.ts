import {Algorithm, Category} from "@/lib/types";
import {createSlice} from "@reduxjs/toolkit";

interface AlgorithmsState {
    algorithms: {
        count: number,
        next: string | undefined | null,
        prev: string | undefined | null,
        results: Algorithm[]
    },
    categories: {
        count: number,
        next: string | undefined | null,
        prev: string | undefined | null,
        results: Category[]
    }
}

const initialState: AlgorithmsState = {
    algorithms: {
        count: 0,
        next: null,
        prev: null,
        results: []
    },
    categories: {
        count: 0,
        next: null,
        prev: null,
        results: []
    }
}

const algorithmsSlice = createSlice({
    name: 'algorithms',
    initialState,
    reducers: {
        setAlgorithms: (state, action) => {
            state.algorithms = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});

export const {
    setAlgorithms,
    setCategories,
} = algorithmsSlice.actions;

export default algorithmsSlice.reducer;