export const BarberIcon = () => {
    return (
        <div className="w-28 flex items-center justify-center animate-[fadeIn_1.5s_ease-out_0.1s_forwards] opacity-0">
            <div className="relative w-16 h-37 flex items-center justify-center">
                <div className="absolute inset-0 rounded-4xl bg-gradient-to-b from-slate-300 via-white to-slate-400 shadow-lg" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-12 h-36 overflow-hidden rounded-full">
                    <div className="w-full h-full animate-[subtleBarberMove_2s_linear_infinite] bg-[repeating-linear-gradient(135deg,#e11d48_0_12px,#2563eb_12px_24px,#fff_24px_36px)]" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-4 rounded-t-full bg-card-foreground" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-14 h-4 rounded-b-full bg-card-foreground" />
            </div>
        </div>
    );
}