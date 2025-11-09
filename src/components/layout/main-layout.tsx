import { Outlet } from "react-router-dom";
import SideBar from "./side-bar";
import Header from "./header";

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            <aside className="shrink-0">
                <SideBar />
            </aside>

            <div className="flex flex-col flex-1">
                <header className="border-b bg-white dark:bg-gray-900">
                    <Header />
                </header>

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
