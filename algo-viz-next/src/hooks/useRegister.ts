import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useRegisterMutation} from "@/redux/features/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {Errors} from "@/lib/types";
import {useAppDispatch} from "@/redux/hooks";

export default function useRegister() {
    const formSchema = z.object({
        first_name: z.string().min(2, 'Must contain at least 2 characters').max(200, 'Must contain less than 200 characters'),
        last_name: z.string().min(1, 'Must contain at least 2 characters').max(200, 'Must contain less than 200 characters'),
        email: z.string().email().max(255),
        password: z.string().min(8, 'Must contain at least 8 characters').max(50, 'Maximum 50 characters'),
        re_password: z.string(),
        gender: z.string(),
        institute: z.string().min(0)
    }).refine((data) => data.password === data.re_password, {
        message: 'Password does not match',
        path: ['re_password']
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            re_password: "",
            gender: "male",
            institute: ""
        }
    });

    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();
    const {toast} = useToast();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        register({...values})
            .unwrap()
            .then(() => {
                toast({
                    title: 'Registration successful!',
                    description: 'Activation link sent to your email address.'
                });

                router.push('/login');
            })
            .catch((e) => {
                if (e.status === 400) {
                    const validationErrors = e.data as Errors;
                    for (const [field, errors] of Object.entries(validationErrors)) {
                        // @ts-ignore
                        form.setError(field, {
                            message: errors.join('. ')
                        })
                    }
                }
            });
    };

    return {
        form,
        handleSubmit,
        isLoading
    }
}