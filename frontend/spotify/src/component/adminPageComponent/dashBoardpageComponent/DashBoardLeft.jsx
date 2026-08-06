import {
    RiDashboardLine,
    RiUser3Line,
    RiMicLine,
    RiMusic2Line,
    RiAlbumLine,
    RiPlayListLine,
    RiBarChartLine,
    RiNotification3Line,
    RiSettings3Line,
} from "@remixicon/react";
import { NavLink } from "react-router-dom";
import React from 'react'
import { Link } from 'react-router-dom'

const DashBoardLeft = ({totalUnread}) => {
    
    const menuItems = [
        { name: "Dashboard", path: "/admin", icon: RiDashboardLine },
        { name: "Users", path: "/admin/users", icon: RiUser3Line },
        { name: "Artists", path: "/admin/artists", icon: RiMicLine },
        { name: "Songs", path: "/admin/songs", icon: RiMusic2Line },
        { name: "Albums", path: "/admin/albums", icon: RiAlbumLine },
        { name: "Playlists", path: "/admin/playlists", icon: RiPlayListLine },
        { name: "Notifications", path: "/admin/notifications", icon: RiNotification3Line, total:totalUnread },
        { name: "Profile", path: "/admin/settings", icon: RiUser3Line },
    ];
    return (
        <div className='w-[25%] fixed bg-[#121212]  h-full  border-t mt-5 border-[#2e2e2e] pt-6'>
            <div className="flex  flex-col gap-3 px-7  py-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 rounded-xl px-5 py-3.5 text-sm transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-green-950/80 to-green-900/50 text-green-400 border-l-2 border-l-green-700 shadow-[0_0_20px_rgba(34,197,94,0.12)] border border-green-500/10"
                                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={16} />
                            <span className="font-semibold">{item.name}</span>
                            {
                                item.total ? (
                            <div className="flex items-center justify-end text-end w-full text-green-500 [text-shadow:0_0_8px_#1DB954,0_0_20px_#1DB954] font-semibold">{item.total}
                            </div>
                                ):
                                    null
                                
                            }
                        </NavLink>
                    );
                })}
            </div>
        </div>
    )
}

export default DashBoardLeft
