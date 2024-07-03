'use client'

import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useEffect, useState} from "react";
import {useGetCategoriesQuery} from "@/redux/features/api/algorithmsApislice";
import {setCategories} from "@/redux/features/algorithmsSlice";
import {badgeVariants} from "@/components/ui/badge";
import Link from "next/link";

export default function CategoriesBadges() {
    const dispatch = useAppDispatch();

    const [queryArgs, setQueryArgs] = useState<{ page: number, pageSize: number, search: string }>({
        page: 1,
        pageSize: 15,
        search: ''
    });

    const {categories} = useAppSelector(state => state.algorithms);
    const {data, isLoading, isError} = useGetCategoriesQuery(queryArgs);

    useEffect(() => {
        if (!isLoading && !isError) {
            dispatch(setCategories(data))
        }
    }, [data, dispatch, isError, isLoading, queryArgs]);

    return (
        <>
            {
                categories.results.map((category, index) => (
                    <Link
                        key={index}
                        href={`/algorithms?category=${category.slug}`}
                        className={badgeVariants()}
                    >
                        {category.name}
                    </Link>
                ))
            }
        </>
    )
}
