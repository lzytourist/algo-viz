import {apiSlice} from "@/redux/services/apiSlice";


const algorithmsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAlgorithms: builder.query({
            query: (queryArgs) => ({
                url: `/algorithms/`,
                params: queryArgs,
            }),
        }),
        getAlgorithm: builder.query({
            query: (slug: string) => ({
                url: `/algorithms/${slug}/`
            }),
        }),
        getCategories: builder.query({
            query: (queryArgs) => ({
                url: '/algorithms/categories/',
                params: queryArgs,
            }),
        }),
        getCategory: builder.query({
            query: (slug: string) => ({
                url: `/algorithms/categories/${slug}/`
            }),
        }),
    }),
});

export const {
    useGetAlgorithmsQuery,
    useGetAlgorithmQuery,
    useGetCategoriesQuery,
    useGetCategoryQuery,
} = algorithmsApiSlice;