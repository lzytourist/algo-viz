'use client'

import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect, useState} from "react";
import {useGetCategoriesQuery} from "@/redux/features/api/algorithmsApislice";
import {setCategories} from "@/redux/features/algorithmsSlice";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronRightIcon} from "@radix-ui/react-icons";

export default function Page() {

    const dispatch = useAppDispatch();
    const {categories} = useAppSelector(state => state.algorithms);

    const searchParams = useSearchParams();

    const [queryArgs, setQueryArgs] = useState<{ page: number, pageSize: number, search: string }>({
        page: 1,
        pageSize: 15,
        search: ''
    });

    const {data, isLoading, isError} = useGetCategoriesQuery(queryArgs);

    useEffect(() => {
        if (!isLoading && !isError) {
            dispatch(setCategories(data));
        }
    }, [queryArgs.page, queryArgs.pageSize, queryArgs.search, isLoading, data, isError, dispatch]);

    return (
        <>
            <section className={'text-center app-bg-color py-16 text-white'}>
                <h1 className={'text-6xl font-light'}>Categories</h1>
            </section>

            <section className={'my-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}>
                {
                    categories.results.map((category, index) => (
                        <Card key={index} className={'rounded-sm shadow-sm'}>
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <Button asChild>
                                    <Link href={`/algorithms/categories/${category.slug}`}>
                                        Explore <ChevronRightIcon/>
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </section>
        </>
    )
}