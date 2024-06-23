import {useGetUserMutation} from "@/redux/features/authApiSlice";
import {useEffect} from "react";
import {User} from "@/lib/types";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setAuth, setUser} from "@/redux/features/authSlice";
import {useRouter} from "next/navigation";


export default function useAuth() {
    const [getUser] = useGetUserMutation();
    const {user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            getUser(undefined)
                .unwrap()
                .then((res: User) => {
                    dispatch(setAuth());
                    dispatch(setUser(JSON.stringify(res)));
                })
                .catch(() => {
                    router.push('/login');
                });
        }
    }, []);
}