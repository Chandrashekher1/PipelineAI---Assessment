export default function LoadingSkelton({ count }: { count: number }) {
    return (
        <div className="flex flex-wrap gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="border rounded-md p-4 animate-pulse w-40">
                    <div className="h-16 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded"></div>
                </div>
            ))}
        </div>
    )
}