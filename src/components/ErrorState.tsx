export default function ErrorState({ error, onR }: { error: string, onR: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center mt-44">
            <p className="text-lg font-semibold">Oops! Something went wrong.</p>
            <p>We couldn't load the Pokemon. </p>
            <button onClick={onR} className="cursor-pointer bg-blue-600 px-4 py-2 rounded-lg text-white">Retry</button>
        </div>
    )
}