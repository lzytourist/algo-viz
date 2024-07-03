'use client'

import {useGetAlgorithmsQuery} from "@/redux/features/api/algorithmsApislice";
import {useEffect, useState} from "react";
import {setAlgorithms} from "@/redux/features/algorithmsSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ChevronRightIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import * as sea from "node:sea";

export default function Page() {
    const searchParams = useSearchParams();

    const dispatch = useAppDispatch();
    const {algorithms} = useAppSelector(state => state.algorithms);

    const [queryArgs, setQueryArgs] = useState<{ page: number, pageSize: number, search: string }>({
        page: 1,
        pageSize: 15,
        search: '',
    });
    const [search, setSearch] = useState<string>('');

    const {data, isLoading, isError} = useGetAlgorithmsQuery(queryArgs);

    useEffect(() => {
        if (!isLoading && !isError) {
            dispatch(setAlgorithms(data));
        }
    }, [queryArgs.page, queryArgs.pageSize, queryArgs.search, data, isLoading, isError, dispatch, searchParams]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setQueryArgs({
                ...queryArgs,
                search: search
            })
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search]);

    return (
        <>
            <section className={'text-center app-bg-color py-16 text-white'}>
                <h1 className={'text-6xl font-light'}>Algorithms</h1>
            </section>

            <section className={'my-8 flex justify-center gap-x-2'}>
                <div className={'flex items-center w-3/4'}>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type={'search'}
                        placeholder={'Search algorithms...'}
                        className={'rounded-r-none focus-visible:ring-2 focus-visible:ring-indigo-600 py-6'}/>

                    <Button type={'submit'} className={'rounded-l-none py-6'}>
                        <MagnifyingGlassIcon/>
                    </Button>
                </div>
            </section>

            <section className={'my-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                {
                    algorithms.results.map((algorithm, index) => (
                        <Card key={index} className={'rounded-sm shadow-sm'}>
                            <CardHeader>
                                <CardTitle>{algorithm.name}</CardTitle>
                                <CardDescription>
                                    <Link
                                        href={`/algorithms/categories/${algorithm.category.slug}`}>{algorithm.category.name}</Link>
                                </CardDescription>
                                <CardFooter className={'py-4 px-0'}>
                                    <Link href={`/algorithms/${algorithm.slug}`}>
                                        <Button>Learn <ChevronRightIcon/></Button>
                                    </Link>
                                </CardFooter>
                            </CardHeader>
                        </Card>
                    ))
                }
            </section>
        </>
    )
}