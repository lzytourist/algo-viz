'use client'

import {useGetUserMutation} from "@/redux/features/api/authApiSlice";
import {useEffect, useRef} from "react";
import {User} from "@/lib/types";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setAuth, finishInitialLoading, setUser} from "@/redux/features/authSlice";


export default function useFetchAuth() {
    const [getUser] = useGetUserMutation();
    const {user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) {
            getUser(undefined)
                .unwrap()
                .then((res: User) => {
                    dispatch(setAuth());
                    dispatch(setUser(JSON.stringify(res)));
                })
                .catch(() => {
                })
                .finally(() => {
                    dispatch(finishInitialLoading());
                });
        }
    }, []);
}