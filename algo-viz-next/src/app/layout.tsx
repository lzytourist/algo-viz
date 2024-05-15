import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Algorithm Visualization and Training - AlgoViz",
    description: "Learn algorithms efficiently and interactively",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className + ' min-h-screen'}>
        <div className={'flex justify-between flex-col min-h-screen'}>
            <Navbar/>
            <main>
                {children}
            </main>
            <footer className={'text-center py-4 bg-slate-950 text-white'}>
                <p>Copyright &copy; {new Date().getFullYear()}, <Link className={'font-bold'} href={'/'}>AlgoViz</Link>
                </p>
            </footer>
        </div>
        </body>
        </html>
    );
}
