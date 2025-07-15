export const LoadingIcon = () => {
    return (
        <div className="flex items-center justify-center text-5xl font-medium ">
            <span className="animate-bounce [animation-delay:-0.3s] text-primary">.</span>
            <span className="animate-bounce [animation-delay:-0.15s] text-red-500">.</span>
            <span className="animate-bounce">.</span>
        </div>
    );
}