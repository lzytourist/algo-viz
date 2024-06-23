import {Metadata} from "next";

export const metadata: Metadata = {
    title: "About | AlgoViz",
    description: "Learn algorithms efficiently and interactively",
};

export default function Page() {
    return (
        <div className={'text-center'}>
            <h1 className={'text-3xl font-medium'}>About</h1>
            <p className={'my-1 text-zinc-600'}>Learn more about our mission, team, and history.</p>
        </div>
    )
}