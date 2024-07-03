'use client'

import CommentForm from "@/components/forms/comment-form";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useAppSelector} from "@/redux/hooks";
import {useGetCommentsQuery} from "@/redux/features/api/algorithmsApislice";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Pagination, PaginationContent, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {formatDateTime} from "@/lib/utils";

export default function Page({params: {slug}}: { params: { slug: string } }) {
    const {isAuthenticated} = useAppSelector(state => state.auth);

    const [queryArgs, setQueryArgs] = useState<{ page: number, pageSize: number }>({
        page: 1,
        pageSize: 15
    });

    const {data, isLoading, isError, refetch} = useGetCommentsQuery({slug, ...queryArgs});

    return (
        <section className={'my-6 grid gap-4 grid-cols-1 lg:grid-cols-3'}>
            {
                isAuthenticated ?
                    <CommentForm slug={slug} fetchComments={refetch}/>
                    : <Link href={'/login'}>
                        <Button>Login to comment</Button>
                    </Link>
            }
            <div className={'col-span-2 grid grid-cols-1 gap-y-2'}>
                {
                    !isLoading && !isError && data.results.map((comment: {
                        user: string;
                        created_at: string;
                        text: string;
                    }, index: React.Key | null) => (
                        <Card className={'w-full rounded-sm shadow-sm'} key={index}>
                            <CardHeader>
                                <CardTitle>{comment.user}</CardTitle>
                                <CardDescription>{formatDateTime(comment.created_at)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {comment.text}
                            </CardContent>
                        </Card>
                    ))
                }

                {
                    !isLoading && !isError && (data.count / queryArgs.pageSize) && (
                        <Pagination>
                            <PaginationContent>
                                {
                                    data.previous && <PaginationPrevious
                                        className={'cursor-pointer'}
                                        onClick={() => setQueryArgs({
                                            ...queryArgs,
                                            page: queryArgs.page - 1
                                        })}/>
                                }
                                {
                                    data.next && <PaginationNext
                                        className={'cursor-pointer'}
                                        onClick={() => setQueryArgs({
                                            ...queryArgs,
                                            page: queryArgs.page + 1
                                        })}/>
                                }
                            </PaginationContent>
                        </Pagination>
                    )
                }
            </div>
        </section>
    )
}