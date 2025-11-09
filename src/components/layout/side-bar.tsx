import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Menu,
  X,
  CircleDollarSign,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationItems } from "@/config/navigationItems";

const drawerWidth = 256;
const collapsedWidth = 80;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          color: "text.primary",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          transition: "width 0.3s ease",
        },
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <CircleDollarSign className="text-emerald-500 h-6 w-6" />
            <span className="font-semibold text-lg">Classroom Saving</span>
          </div>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
          {collapsed ? <Menu /> : <X />}
        </IconButton>
      </div>

      {/* Menu */}
      <List sx={{ px: 1, pt: 2 }}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip
              key={item.path}
              title={collapsed ? item.name : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 2 : 3,
                  py: 1.5,
                  backgroundColor: isActive
                    ? "rgba(16,185,129,0.15)"
                    : "transparent",
                  color: isActive ? "rgb(16,185,129)" : "inherit",
                  "&:hover": {
                    backgroundColor: "rgba(16,185,129,0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "rgb(16,185,129)" : "inherit",
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.name} />}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ my: "auto" }} />

      {/* Footer */}
      <div className="p-3 text-center text-xs text-gray-400 dark:text-gray-500">
        {!collapsed && "v1.0.0 © Classroom Saving"}
      </div>
    </Drawer>
  );
}
