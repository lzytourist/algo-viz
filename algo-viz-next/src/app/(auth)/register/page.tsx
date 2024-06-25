import RegisterForm from "@/components/forms/register-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    return (
        <div className={'mx-auto w-full md:w-3/4 lg:w-2/5'}>
            <Card className={'rounded-sm shadow-none'}>
                <CardHeader>
                    <CardTitle className={'text-3xl font-light'}>Registration</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm/>
                </CardContent>
                <CardFooter>
                    <p className={'text-sm'}>Already have an account? <Link className={'app-text-color'}
                                                                            href={'/login'}>Login here</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}