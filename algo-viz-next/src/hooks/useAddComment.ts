import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/components/ui/use-toast";
import {useAppDispatch} from "@/redux/hooks";
import {setAuth} from "@/redux/features/authSlice";
import {usePostCommentMutation} from "@/redux/features/api/algorithmsApislice";

export default function useAddComment({slug, fetchComments}: {slug: string, fetchComments: Function}) {
    const formSchema = z.object({
        text: z.string().min(1, 'Comment is required').max(255),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: ""
        }
    });

    const [postComment, {isLoading}] = usePostCommentMutation();
    const {toast} = useToast();

    const dispatch = useAppDispatch();

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        postComment({...values, slug})
            .unwrap()
            .then(() => {
                dispatch(setAuth());

                toast({
                    title: 'Comment posted!',
                });

                fetchComments();

                form.setValue('text', '');
            })
            .catch(() => {
                toast({
                    title: 'Comment could not be posted',
                    variant: 'destructive'
                })
            });
    };

    return {
        form,
        handleSubmit,
        isLoading
    }
}