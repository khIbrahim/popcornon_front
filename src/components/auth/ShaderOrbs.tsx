export function ShaderOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large red orb */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full glow-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%)",
                    top: "10%",
                    left: "20%",
                }}
            />

            {/* Orange orb */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full glow-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0) 70%)",
                    bottom: "15%",
                    right: "15%",
                    animationDelay: "2s",
                }}
            />

            {/* Small accent orb */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full glow-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0) 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    animationDelay: "1s",
                }}
            />
        </div>
    )
}
