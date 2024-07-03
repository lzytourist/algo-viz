'use client'

import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useGetCategoryQuery} from "@/redux/features/api/algorithmsApislice";

export default function Page({params: {slug}}: { params: { slug: string } }) {
    const dispatch = useAppDispatch();
    const {categories} = useAppSelector(state => state.algorithms);

    const {data, isLoading, isError} = useGetCategoryQuery(slug);

    return !isLoading && !isError && (
        <>
            <section className={'text-center app-bg-color py-16 text-white'}>
                <h1 className={'text-6xl font-light'}>{data.name}</h1>
            </section>
        </>
    )
}