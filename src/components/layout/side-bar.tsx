import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
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
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
          borderRight: "1px solid var(--color-border)",
          transition: "width 0.3s ease",
        },
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <CircleDollarSign
              className="h-6 w-6"
              style={{ color: "var(--color-primary)" }}
            />
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
                    ? "var(--color-primary-light)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text)",
                  "&:hover": {
                    backgroundColor: "var(--color-primary-hover)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text)",
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
    </Drawer>

  );
}
