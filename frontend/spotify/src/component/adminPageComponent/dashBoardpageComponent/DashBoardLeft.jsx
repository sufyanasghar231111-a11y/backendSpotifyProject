import {
    RiDashboardLine,
    RiUser3Line,
    RiMicLine,
    RiMusic2Line,
    RiAlbumLine,
    RiPlayListLine,
    RiNotification3Line,
    RiCloseFill,
    RiSpotifyFill,
} from "@remixicon/react";
import { NavLink } from "react-router-dom";
import React from "react";

const DashBoardLeft = ({ totalUnread, hide, setHide }) => {

    const menuItems = [
        { name: "Dashboard", path: "/admin", icon: RiDashboardLine },
        { name: "Users", path: "/admin/users", icon: RiUser3Line },
        { name: "Artists", path: "/admin/artists", icon: RiMicLine },
        { name: "Songs", path: "/admin/songs", icon: RiMusic2Line },
        { name: "Albums", path: "/admin/albums", icon: RiAlbumLine },
        { name: "Playlists", path: "/admin/playlists", icon: RiPlayListLine },
        {
            name: "Notifications",
            path: "/admin/notifications",
            icon: RiNotification3Line,
            total: totalUnread,
        },
        {
            name: "Profile",
            path: "/admin/settings",
            icon: RiUser3Line,
        },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className={`
                    fixed inset-0 z-[290] bg-black/60 md:hidden
                    transition-opacity duration-300
                    ${hide
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }
                `}
                onClick={() => setHide(true)}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-[300]
                    h-screen
                    pt-16
                    mt-5
                    bg-[#121212]
                    border-t border-[#2e2e2e]

                    w-[260px]
                    sm:w-[280px]

                    md:w-[240px]
                    lg:w-[260px]
                    xl:w-[280px]

                    md:translate-x-0
                    md:opacity-100
                    md:z-[100]

                    transition-all duration-300

                    ${hide
                        ? "-translate-x-full opacity-0"
                        : "translate-x-0 opacity-100"
                    }
                `}
            >

                {/* Mobile close */}
                <button
                    className="
                        md:hidden
                        absolute top-7 right-4
                        flex items-center justify-center
                        w-6 h-6
                        rounded-lg
                        text-gray-400
                        hover:text-white
                        hover:bg-zinc-800
                        transition
                    "
                    onClick={() => setHide(true)}
                    aria-label="Close menu"
                >
                    <RiCloseFill size={20} />
                </button>

                <div className=" absolute top-7 left-4">
                    <RiSpotifyFill size={25} className="text-green-500" />
                </div>
                {/* Menu */}
                <div
                    className="
                        h-[calc(100vh-80px)]
                        flex flex-col
                        gap-2
                        px-4
                        sm:px-5
                        lg:px-6
                        py-4
                        overflow-y-auto
                    "
                >
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setHide(true)}
                                className={({ isActive }) =>
                                    `
                                    flex items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    sm:py-3.5
                                    text-sm

                                    transition-all
                                    duration-300

                                    ${isActive
                                        ? `
                                                bg-gradient-to-r
                                                from-green-950/80
                                                to-green-900/50
                                                text-green-400
                                                border-l-2
                                                border-l-green-700
                                                border
                                                border-green-500/10
                                                shadow-[0_0_20px_rgba(34,197,94,0.12)]
                                            `
                                        : `
                                                text-gray-400
                                                hover:bg-zinc-800
                                                hover:text-white
                                            `
                                    }
                                    `
                                }
                            >
                                <Icon
                                    size={18}
                                    className="shrink-0"
                                />

                                <span className="font-semibold whitespace-nowrap">
                                    {item.name}
                                </span>

                                {item.total ? (
                                    <span
                                        className="
                                            ml-auto
                                            text-green-500
                                            font-semibold
                                            [text-shadow:0_0_8px_#1DB954,0_0_20px_#1DB954]
                                        "
                                    >
                                        {item.total}
                                    </span>
                                ) : null}
                            </NavLink>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};

export default DashBoardLeft;