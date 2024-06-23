import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";

export default function Page() {
    return (
        <div className={'flex justify-center flex-1'}>
            <Card className={'rounded-sm shadow-none w-[600px]'}>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
                <CardFooter>
                    <p>Don&apos;t have an account? <Link className={'link-color'} href={'/register'}>Register here</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}