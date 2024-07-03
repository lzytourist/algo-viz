import React from "react";

export default function Layout({children, comments}: {children: React.ReactNode, comments: React.ReactNode}) {
    return (
        <div>
            {children}
            <hr className={''}></hr>
            {comments}
        </div>
    )
}