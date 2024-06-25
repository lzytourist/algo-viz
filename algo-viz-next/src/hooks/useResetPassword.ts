import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useResetPasswordConfirmMutation} from "@/redux/features/api/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {useAppDispatch} from "@/redux/hooks";
import {Errors} from "@/lib/types";

export default function useResetPassword({uid, token}: { uid: string, token: string }) {
    const formSchema = z.object({
        new_password: z.string().min(8, 'Must contain at least 8 characters').max(50, 'Maximum 50 characters'),
        re_new_password: z.string().min(8, 'Must contain at least 8 characters').max(50, 'Maximum 50 characters'),
    }).refine((data) => data.new_password == data.re_new_password, {
        message: 'Password does not match',
        path: ['re_new_password']
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            new_password: "",
            re_new_password: "",
        }
    });

    const router = useRouter();
    const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation();
    const {toast} = useToast();

    const dispatch = useAppDispatch();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        resetPasswordConfirm({...values, uid, token})
            .unwrap()
            .then(() => {
                toast({
                    title: 'Password reset successful!',
                    description: 'Please use the new password to login.'
                });
                router.push('/login');
            })
            .catch((e) => {
                if (e.status === 400) {
                    const validationErrors = e.data as Errors;
                    for (const [field, errors] of Object.entries(validationErrors)) {
                        // @ts-ignore
                        form.setError(field, {
                            message: errors.join(' ')
                        });

                        if (field === 'token') {
                            toast({
                                title: 'Something went wrong!',
                                // title: 'You should be banned!',
                                // description: 'Your account has been reported to the admin.',
                                variant: 'destructive'
                            });
                        }
                    }
                } else {
                    toast({
                        title: 'Could not reset password',
                        variant: 'destructive'
                    });
                }
            });
    };

    return {
        form,
        handleSubmit,
        isLoading
    }
}