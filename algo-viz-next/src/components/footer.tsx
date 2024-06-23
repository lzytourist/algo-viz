import Link from "next/link";

export default function Footer() {
    return (
        <footer className={'bg-secondary text-center py-8'}>
            <p>&copy; {new Date().getFullYear()}, <Link href={'/'} className={'link-color'}>AlgoViz</Link>. All rights reserved.</p>
        </footer>
    )
}