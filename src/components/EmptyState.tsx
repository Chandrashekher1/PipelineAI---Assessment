export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center mt-44">
            <p className="text-xl font-bold">No Pokemon found</p>
            <p>Try searching with a different name or select a type.</p>
        </div>
    )
}