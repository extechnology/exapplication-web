import { useState } from "react";
import Header from "../common/Header";
import MobileNav from "../common/MobNav";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";



export default function MainLayout() {



    // Sidebar collapse state
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


    return (


        <div className="flex flex-col min-h-screen bg-background">


            {/* FULL WIDTH HEADER */}
            <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />


            {/* BELOW HEADER: SIDEBAR + MAIN CONTENT */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="hidden md:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                </aside>


                {/* Main Content */}
                <main className="flex-1 pb-20 md:pb-6 transition-all duration-300 ease-in-out">
                    <div className="mx-auto w-full">
                        <Outlet />
                    </div>
                </main>

            </div>


            {/* Mobile Bottom Navigation */}
            <MobileNav />


        </div>


    );


};
