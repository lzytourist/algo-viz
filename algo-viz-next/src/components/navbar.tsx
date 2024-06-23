'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {AvatarIcon} from "@radix-ui/react-icons";
import {useLogoutMutation} from "@/redux/features/authApiSlice";
import {setLogout} from "@/redux/features/authSlice";
import useFetchAuth from "@/hooks/useFetchAuth";

export default function Navbar() {
    useFetchAuth();

    const pathname = usePathname();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const {isAuthenticated, user} = useAppSelector(state => state.auth);
    const [logout] = useLogoutMutation();

    const isActive = (path: string) => pathname == path;

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout())
            })
            .catch(() => {})
            .finally(() => {
                router.push('/')
            });
    };

    const getAvatarString = (name: string) => {
        let avatar = "";
        const bits = name.split(' ');
        for (const index in bits) {
            avatar += bits[index].at(0);
        }
        return avatar;
    };

    const AUTH_LINKS =
        isAuthenticated && user ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarIcon/>
                        <AvatarFallback>{getAvatarString(`${user.first_name} ${user.last_name}`)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{user.first_name} {user.last_name}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <Link href={'/dashboard/profile'}>
                            <DropdownMenuItem className={'cursor-pointer'}>
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem disabled>
                            Change password
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout} className={'cursor-pointer'}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            : '';

    const GUEST_LINKS = (
        <div className={'flex items-center gap-x-1'}>
            <Link href={'/login'}>
                <Button variant={'outline'}>Login</Button>
            </Link>
            <Link href={'/register'}>
                <Button>Register</Button>
            </Link>
        </div>
    );

    return (
        <nav
            className={'sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'}>
            <div className={'container h-16 flex justify-between items-center'}>
                <Link href={'/'}>
                    <h1 className={'text-4xl font-light'}>Alog<span className={'link-color font-bold'}>Viz</span></h1>
                </Link>
                <ul className={'flex items-center'}>
                    <li>
                        <Link href={'/'}
                              className={'py-4 px-2' + (pathname.length == null || pathname.length == 1 ? ' font-medium link-color' : '')}>Home</Link>
                    </li>
                    <li>
                        <Link href={'/algorithms'}
                              className={'py-4 px-2' + (isActive('/algorithms') ? ' font-medium link-color' : '')}>Algorithms</Link>
                    </li>
                    <li>
                        <Link href={'/about'}
                              className={'py-4 px-2' + (isActive('/about') ? ' font-medium link-color' : '')}>About</Link>
                    </li>
                </ul>
                {isAuthenticated ? AUTH_LINKS : GUEST_LINKS}
            </div>
        </nav>
    )
}
