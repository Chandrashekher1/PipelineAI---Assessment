interface ErrorStateProps {
    error?: string | null;
    onR: () => void;
}

export default function ErrorState({ error, onR }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center mt-44">
            <img
                src="https://i.pinimg.com/1200x/05/ab/83/05ab83eda569019a739231d3c70f49ec.jpg"
                alt="error-image"
                className="rounded-full w-40 h-40 object-cover"
            />
            <p className="text-lg font-semibold mt-5">Oops! Something went wrong.</p>
            <p className="text-gray-500 text-sm font-semibold mt-2">We couldn't load the Pokemon.</p>
            {error && <p className="text-xs text-red-500 mt-1 max-w-sm text-center">{error}</p>}
            <p className="text-gray-500 text-sm font-semibold mt-2">Please try Again</p>
            <button onClick={onR} className="cursor-pointer bg-secondary px-12 py-2 rounded-md text-white mt-4 hover:opacity-90 transition-opacity">
                Retry
            </button>
        </div>
    );
}