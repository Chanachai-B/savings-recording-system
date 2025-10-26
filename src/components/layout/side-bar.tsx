import { cn } from "@/lib/cn";
import Button from "@mui/material/Button";
import {
  CalendarDays,
  CircleDollarSign,
  LayoutDashboard,
  Menu,
  PiggyBank,
  Trophy,
  UserSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
  { icon: PiggyBank, name: "Transaction", path: "/transaction" },
  { icon: CalendarDays, name: "Daily Report", path: "/reports/daily" },
  { icon: UserSearch, name: "Personal Report", path: "/reports/personal" },
  { icon: Trophy, name: "Leaderboard", path: "/leaderboard" },
];

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col shadow-lg transition-all duration-300 bg-white dark:bg-gray-800",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          {isCollapsed ? (
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="!min-w-0 !p-2"
            >
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-6 w-6 text-emerald-500" />
                <span className="text-sm font-semibold">
                  ระบบบันทึกการออมห้องเรียน
                </span>
              </div>
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="!min-w-0 !p-2"
              >
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center rounded-md px-3 py-2 normal-case font-medium transition-all duration-200",
                  "hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600",
                  isCollapsed ? "justify-center" : "justify-start gap-3"
                )}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex justify-center p-3 text-xs text-gray-400">
          {!isCollapsed && "v1.0.0 © Classroom Saving"}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 overflow-auto transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;
