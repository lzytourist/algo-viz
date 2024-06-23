import {apiSlice} from "@/redux/services/apiSlice";
import {NewUser} from "@/lib/types";


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.mutation({
            query: () => ({
                url: '/auth/users/me/'
            })
        }),
        register: builder.mutation({
            query: (newUser: NewUser) => ({
                url: '/auth/users/',
                method: 'POST',
                body: newUser
            })
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: '/auth/token/login/',
                method: 'POST',
                body: {email, password}
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/token/logout/',
                method: 'POST'
            })
        }),
        activation: builder.mutation({
            query: ({uid, token}) => ({
                url: '/auth/users/activation/',
                method: 'POST',
                body: {uid, token}
            })
        }),
        resendActivation: builder.mutation({
            query: ({email}) => ({
                url: '/auth/users/resend_activation/',
                method: 'POST',
                body: {email}
            })
        }),
        resetPassword: builder.mutation({
            query: ({email}) => ({
                url: '/auth/users/reset_password/',
                method: 'POST',
                body: {email}
            })
        }),
        resetPasswordConfirm: builder.mutation({
            query: ({uid, token, new_password, re_new_password}) => ({
                url: '/auth/users/reset_password_confirm/',
                method: 'POST',
                body: {uid, token, new_password, re_new_password}
            })
        }),
    })
});

export const {
    useGetUserMutation,
    useRegisterMutation,
    useActivationMutation,
    useResendActivationMutation,
    useLoginMutation,
    useLogoutMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation,
} = authApiSlice;