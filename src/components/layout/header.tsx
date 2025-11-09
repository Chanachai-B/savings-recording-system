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
        <div
            className="flex gap-2 border-b"
            style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
            }}
        >
            <div
                className="flex justify-center items-center px-4"
                style={{ color: "var(--color-primary)" }}
            >
                {currentPage.icon}
            </div>

            <div className="p-4 flex flex-col justify-center">
                <h1
                    className="text-xl font-bold"
                    style={{ color: "var(--color-text)" }}
                >
                    {currentPage.name}
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {currentPage.description}
                </p>
            </div>
        </div>
    );
};

export default Header;
