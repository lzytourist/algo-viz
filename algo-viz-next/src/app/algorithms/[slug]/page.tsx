'use client'

import {useGetAlgorithmQuery} from "@/redux/features/api/algorithmsApislice";
import LoadingSpinner from "@/components/loading-spinner";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeftIcon} from "@radix-ui/react-icons";
import {categoriesBreadcrumb} from "@/lib/utils";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import dynamic from "next/dynamic";

export default function Page({params: {slug}}: { params: { slug: string } }) {
    const {data, isLoading, isError} = useGetAlgorithmQuery(slug);

    const AlgorithmComponent = dynamic(() => import(`@/components/algorithms/${data.component}.tsx`));

    return !isLoading && !isError ? (
        <div>
            <section className={'py-16 app-bg-color text-white flex flex-col items-center gap-y-2'}>
                <h1 className={'text-4xl font-light'}>{data.name}</h1>

                <Breadcrumb>
                    <BreadcrumbList className={'text-white'}>
                        {
                            categoriesBreadcrumb(data.category).map((item, index) => (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
                                    {!item.last && <BreadcrumbSeparator/>}
                                </BreadcrumbItem>
                            ))
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className={'my-6'}>
                <h2 className={'text-center text-3xl mb-4'}>Visualization</h2>
                <AlgorithmComponent/>
            </section>

            <section className={'my-6'} dangerouslySetInnerHTML={{__html: data.description}}>
            </section>

            <section className={'my-6'}>
                <Link href={'/algorithms'}>
                    <Button><ChevronLeftIcon/> Go back</Button>
                </Link>
            </section>
        </div>
    ) : <LoadingSpinner/>
}