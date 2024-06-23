import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";
import Provider from "@/redux/provider";
import {Toaster} from "@/components/ui/toaster";
import useFetchAuth from "@/hooks/useFetchAuth";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "AlgoViz",
    description: "Learn algorithms efficiently and interactively",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className + ' min-h-screen bg-background'}>
        <Provider>
            <Navbar/>
            <main className={'container mx-auto my-8'}>
                {children}
            </main>
            <Footer/>
        </Provider>
        <Toaster/>
        </body>
        </html>
    );
}
