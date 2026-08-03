import React, { useContext, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { ChevronDown } from 'lucide-react'
import { adminContext } from '../../../contextapi/AdminContext'


const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="rounded-lg bg-[#0a0a0a] border border-white/10 px-3 py-2 shadow-xl">
      <p className="text-[11px] text-white/50 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.dataKey === 'songs' ? 'Songs' : 'Albums'}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const AlbumSongChart = () => {

  const {monthlyDataCount} = useContext(adminContext)
  
    const [changeColor, setChangeColor] = useState('songs')

  return (
    <div className="w-full rounded-xl bg-[#141414] p-5.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-[17px] font-semibold tracking-tight">Songs vs Albums</h2>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-[3px] ${changeColor === 'songs'? 'bg-[#22e35a]':'bg-[#8a8f98]'}`} />
          <span onClick={()=>{setChangeColor('songs')}} className="text-[12px] text-white/60 cursor-pointer">Songs</span>
        </div>
        <div className="flex items-center gap-1.5 ">
          <span  className={`w-2.5 h-2.5 rounded-[3px] ${changeColor === 'albums'? 'bg-[#22e35a]':'bg-[#8a8f98]'}`} />
          <span onClick={()=>{setChangeColor('albums')}} className={`text-[12px] text-white/60 cursor-pointer`}>Albums</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-50 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyDataCount} barGap={4} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="songsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22e35a" stopOpacity={1} />
                <stop offset="100%" stopColor="#0f7a2e" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="albumsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3a8b0" stopOpacity={1} />
                <stop offset="100%" stopColor="#4b4f57" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
               domain={[0, "dataMax + 1"]}
               
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="songs"  fill={changeColor === "songs" ? "url(#songsGradient)" : "#4b4f57"} radius={[4, 4, 0, 0]} maxBarSize={22} />
            <Bar dataKey="albums"  fill={changeColor === "albums" ? "url(#songsGradient)" : "#4b4f57"} radius={[4, 4, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AlbumSongChart