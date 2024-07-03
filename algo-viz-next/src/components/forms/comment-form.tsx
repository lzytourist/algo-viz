import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ButtonLoading} from "@/components/ui/button-loading";
import useAddComment from "@/hooks/useAddComment";
import {Textarea} from "@/components/ui/textarea";

export default function CommentForm({slug, fetchComments}: { slug: string, fetchComments: Function }) {
    const {form, handleSubmit, isLoading} = useAddComment({slug, fetchComments});

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} suppressHydrationWarning={true}>
                <div
                    className={'capitalize grid w-full gap-2'}
                >
                    <FormField
                        control={form.control}
                        name={'text'}
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Type your comment..." {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {
                        !isLoading ? <Button type={"submit"} className={''}>Post</Button>
                            : <ButtonLoading className={'w-full mt-6'}/>
                    }
                </div>

            </form>
        </Form>
    )
}