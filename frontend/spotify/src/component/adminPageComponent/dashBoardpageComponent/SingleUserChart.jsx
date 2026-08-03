import React, { useContext } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { adminContext } from '../../../contextapi/AdminContext';

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-[#2a2f2c] bg-[#1e2320] px-3 py-2 shadow-lg">
            <p className="mb-1 text-xs text-gray-400">{label}</p>

            <p className="text-sm font-semibold text-[#39ff6a]">
                {payload[0].value.toLocaleString()} users
            </p>
        </div>
    );
}
const SingleUserChart = () => {

    const {getMonthlyActive} = useContext(adminContext)
    return (

        <div className="w-full  rounded-xl bg-[#141815] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#e8ebe9]">
                    Monthly Active Users
                </h2>

                <button className="flex items-center gap-2 rounded-full bg-[#1e2320] px-3 py-1.5 text-[10px] text-gray-300 hover:bg-[#262b28] transition">
                    This Year
                    <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <polyline
                            points="6 9 12 15 18 9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Chart */}
            <ResponsiveContainer
                width="100%"
                height={260}
            >
                <AreaChart
                    data={getMonthlyActive}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="areaFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#39ff6a"
                                stopOpacity={0.35}
                            />
                            <stop
                                offset="100%"
                                stopColor="#39ff6a"
                                stopOpacity={0}
                            />
                        </linearGradient>

                        <filter
                            id="glow"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feGaussianBlur
                                stdDeviation="3"
                                result="blur"
                            />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <CartesianGrid
                        stroke="#2a2f2c"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="month"
                        stroke="#7c8380"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#7c8380", fontSize: 12 }}
                    />

                    <YAxis
                        stroke="#7c8380"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#7c8380", fontSize: 12 }}
                        tickFormatter={(v) => `${v / 1000}K`}
                    />

                    <Tooltip
                        content={<CustomTooltip  />}
                        cursor={{
                            stroke: "#39ff6a",
                            strokeOpacity: 0.3,
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#39ff6a"
                        strokeWidth={2.5}
                        fill="url(#areaFill)"
                        dot={false}
                        activeDot={{
                            r: 5,
                            fill: "#39ff6a",
                            stroke: "#141815",
                            strokeWidth: 2,
                        }}
                        style={{ filter: "url(#glow)" }}

                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    )
}

export default SingleUserChart