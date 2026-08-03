export function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    const {name, value} =payload[0]

    return (
        <div className="rounded-xl border border-[#2a2f2c] bg-[#1e2320] px-3 py-2 shadow-lg">
            <p className="mb-1 text-xs text-gray-400">{label}</p>

            <p className="text-sm font-semibold text-[#39ff6a]">
                {value.toLocaleString()}  {name}
            </p>
        </div>
    );
}