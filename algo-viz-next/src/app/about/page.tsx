import {Metadata} from "next";

export const metadata: Metadata = {
    title: "About | AlgoViz",
    description: "Learn algorithms efficiently and interactively",
};

export default function Page() {
    return (
        <div className={'text-center app-bg-color py-16 text-white'}>
            <h1 className={'text-6xl font-light'}>About</h1>
            <p className={'my-1 text-gray-100'}>Learn more about our mission, team, and history.</p>
        </div>
    )
}