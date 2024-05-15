import Image from "next/image";
import BubbleSort from "@/components/algorithms/sorting/bubble-sort";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            <h1 className={'text-4xl font-bold text-center py-6'}>Welcome to AlgoViz</h1>
            <div className="text-center">
                            <Link href={'/sorting/bubblesort'} className={buttonVariants() + ' my-6'}>A sorting algorithm</Link>

            </div>
        </div>
    );
}
