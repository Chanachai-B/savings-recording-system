import { navigationItems } from "@/config/navigationItems";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPage = navigationItems.find(
        (item) => item.path === location.pathname
    );

    useEffect(() => {
        if (!currentPage) {
            navigate("/not-found", { replace: true });
        }
    }, [currentPage, navigate]);

    if (!currentPage) return null;

    return (
        <div className="flex gap-2">
            <div className="flex justify-center items-center">
                {currentPage.icon}
            </div>
            <div className="p-4 bg-white dark:bg-gray-900">
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {currentPage.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPage.description}
                </p>
            </div>
        </div>
    );
};

export default Header;
