'use client'

import useAuth from "@/hooks/useAuth";
import {useAppSelector} from "@/redux/hooks";

export default function Layout({children}: {children: React.ReactNode}) {
    useAuth();

    const {isAuthenticated} = useAppSelector(state => state.auth);

    return isAuthenticated && <>{children}</>
}