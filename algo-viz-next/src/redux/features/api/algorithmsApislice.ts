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
        getComments: builder.query({
            query: ({slug, page, pageSize})=> ({
                url: `/algorithms/${slug}/comments/`,
                params: {page, pageSize}
            }),
        }),
        postComment: builder.mutation({
            query: ({text, slug}) => ({
                url: `/algorithms/${slug}/comments/`,
                method: 'POST',
                body: {text},
            }),
        })
    }),
});

export const {
    useGetAlgorithmsQuery,
    useGetAlgorithmQuery,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetCommentsQuery,
    usePostCommentMutation,
} = algorithmsApiSlice;