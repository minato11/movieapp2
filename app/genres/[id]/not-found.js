import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 lg:px-8">
            <h2>Not Found</h2>
            <p>Could not find requested genre</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}