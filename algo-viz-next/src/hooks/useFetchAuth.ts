'use client'

import {useGetUserMutation} from "@/redux/features/authApiSlice";
import {useEffect} from "react";
import {User} from "@/lib/types";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setAuth, startLoading, finishLoading, setUser} from "@/redux/features/authSlice";


export default function useFetchAuth() {
    const [getUser] = useGetUserMutation();
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(startLoading());

        if (!user) {
            getUser(undefined)
                .unwrap()
                .then((res: User) => {
                    dispatch(setAuth());
                    dispatch(setUser(JSON.stringify(res)));
                })
                .catch(() => {})
                .finally(() => {
                    dispatch(finishLoading());
                });
        }
    }, []);
}