'use client'

import {makeStore} from "@/redux/store";
import {Provider} from "react-redux";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function CustomProvider({children} : Props) {
    return (
        <Provider store={makeStore()}>{children}</Provider>
    )
}