import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdateProfileMutation} from "@/redux/features/api/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {Errors, User} from "@/lib/types";
import {useAppDispatch} from "@/redux/hooks";
import {setUser} from "@/redux/features/authSlice";

export default function useRegister() {
    const formSchema = z.object({
        first_name: z.string().min(2, 'Must contain at least 2 characters').max(200, 'Must contain less than 200 characters'),
        last_name: z.string().min(1, 'Must contain at least 2 characters').max(200, 'Must contain less than 200 characters'),
        gender: z.string(),
        institute: z.string().min(0),
    });

    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "",
            institute: "",
        }
    });

    const setProfile = ({first_name, last_name, gender, institute}: {
        first_name: string,
        last_name: string,
        gender: string,
        institute: string,
    }) => {
        form.setValue('first_name', first_name);
        form.setValue('last_name', last_name);
        form.setValue('gender', gender);
        form.setValue('institute', institute);
    };

    const [updateProfile, {isLoading}] = useUpdateProfileMutation();
    const {toast} = useToast();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        updateProfile({...values})
            .unwrap()
            .then((res: User) => {
                toast({
                    title: 'Profile updated',
                });
                dispatch(setUser(JSON.stringify(res)));
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
        isLoading,
        setProfile,
    }
}