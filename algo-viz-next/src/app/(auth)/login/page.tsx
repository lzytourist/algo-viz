import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";

export default function Page() {
    return (
        <div className={'mx-auto w-full md:w-3/4 lg:w-2/5'}>
            <Card className={'rounded-sm shadow-none'}>
                <CardHeader>
                    <CardTitle className={'text-3xl font-light'}>Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
                <CardFooter>
                    <p className={'text-sm'}>Don&apos;t have an account? <Link className={'app-text-color'} href={'/register'}>Register here</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}