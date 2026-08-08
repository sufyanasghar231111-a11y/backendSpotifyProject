import { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { CreateAlbumContext } from "../../contextapi/ArtistMusicContext";
import { authPlaylist } from "../../contextapi/PlaylistContext";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-700 bg-[#242424] px-3 py-2 shadow-lg">
      <p className="text-xs text-zinc-400">{name}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
};

const ArtistStatsChart = ({ otherArtist }) => {
  const { ownSongs = [] } = useContext(CreateAlbumContext);
  const { visibleParticular } = useContext(authPlaylist)

  const data = [
    { name: `Song${ownSongs.length>1?'s':''}`, value: ownSongs.length },
    { name: `Album${otherArtist.length>1?'s':''}`, value: otherArtist.length },
    {name:`Public Playlist${visibleParticular.length>1?'s':''}`, value:visibleParticular.length}
  ];

  return (
    <div className="rounded-xl bg-[#181818] p-4 sm:p-6 shadow-lg shadow-black/20">
      <h2 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold tracking-tight text-white">
        Library Overview
      </h2>

      <div className="h-52 sm:h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
            barSize={20}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#2a2a2a"
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              axisLine={{ stroke: "#3f3f46" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#d4d4d8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={60}
              tickFormatter={(value) =>
                value.length > 10 ? `${value.slice(0, 9)}…` : value
              }
            />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ArtistStatsChart;