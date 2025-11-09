import React from "react";
import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

/** 🔹 Props ของปุ่มกลาง */
interface AppButtonProps extends Omit<MuiButtonProps, "color" | "variant"> {
    variant?: "primary" | "outline" | "text";
}

/** 🔹 ปุ่มกลาง */
const AppButton: React.FC<AppButtonProps> = ({
    children,
    variant = "primary",
    sx,
    ...props
}) => {
    /** 🔸 style อิงจาก theme.css */
    const variantStyle =
        variant === "primary"
            ? {
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                "&:hover": { backgroundColor: "var(--color-primary-hover)" },
            }
            : variant === "outline"
                ? {
                    backgroundColor: "transparent",
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    "&:hover": { backgroundColor: "var(--color-primary-light)" },
                }
                : {
                    backgroundColor: "transparent",
                    color: "var(--color-primary)",
                    "&:hover": { backgroundColor: "var(--color-primary-light)" },
                };

    return (
        <MuiButton
            {...props}
            sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "0.5rem",
                px: 2.5,
                py: 1,
                transition: "all 0.2s ease-in-out",
                ...variantStyle,
                ...sx,
            }}
        >
            {children}
        </MuiButton>
    );
};

export default AppButton;
