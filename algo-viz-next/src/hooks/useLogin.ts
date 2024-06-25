import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useLoginMutation} from "@/redux/features/api/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {useAppDispatch} from "@/redux/hooks";
import {setAuth} from "@/redux/features/authSlice";

export default function useLogin() {
    const formSchema = z.object({
        email: z.string().email().max(255),
        password: z.string().min(1, 'Password is required').max(200),

    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const router = useRouter();
    const [login, {isLoading}] = useLoginMutation();
    const {toast} = useToast();

    const dispatch = useAppDispatch();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        login({...values})
            .unwrap()
            .then(() => {
                dispatch(setAuth());

                toast({
                    title: 'Log in successful!',
                });
                router.push('/dashboard');
            })
            .catch(() => {
                toast({
                    title: 'Wrong credentials!',
                    description: 'If you think this is a mistake, please contact us.',
                    variant: 'destructive'
                })
            })
    };

    return {
        form,
        handleSubmit,
        isLoading
    }
}