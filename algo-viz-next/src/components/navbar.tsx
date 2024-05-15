import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-slate-900 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link href={'/'} className="font-semibold text-2xl tracking-tight">AlgoViz</Link>
                </div>
                <div className="flex items-center">
                    <Link href={'/sign-in'} className="text-white mr-4">Sign In</Link>
                    <Link href={'/sign-up'} className="text-white mr-4">Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar