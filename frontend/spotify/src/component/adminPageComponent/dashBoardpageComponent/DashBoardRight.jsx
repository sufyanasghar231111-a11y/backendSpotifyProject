import React from "react";
import DashBoardMidHeader from "./DashBoardMidHeader";
import DashBoardMiddleChart from "./DashBoardMiddleChart";
import UserRequsertToAdmin from "./UserRequsertToAdmin";

const DashBoardRight = () => {
    return (
        <main
            className="
                w-full

                md:ml-[240px]
                lg:ml-[260px]
                xl:ml-[280px]

                md:w-[calc(100%-240px)]
                lg:w-[calc(100%-260px)]
                xl:w-[calc(100%-280px)]

                min-h-screen

                mt-5

                border-t
                border-[#2e2e2e]

                bg-[#121212]

                overflow-x-hidden
            "
        >
            <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-4">
                <DashBoardMidHeader />

                <div className="mt-4">
                    <DashBoardMiddleChart />
                </div>

                <div className="mt-4">
                    <UserRequsertToAdmin />
                </div>
            </div>
        </main>
    );
};

export default DashBoardRight;