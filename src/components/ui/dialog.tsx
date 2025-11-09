import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import { X } from "lucide-react";

interface AppDialogProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    children: React.ReactNode;
}

/** 🔹 Dialog กลาง ใช้อิง theme.css */
const AppDialog: React.FC<AppDialogProps> = ({
    open,
    title,
    onClose,
    onConfirm,
    confirmLabel = "ตกลง",
    cancelLabel = "ยกเลิก",
    maxWidth = "sm",
    children,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    borderRadius: 3,
                    border: "1px solid var(--color-border)",
                },
            }}
        >
            {/* ───────── Header ───────── */}
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    borderBottom: "1px solid var(--color-border)",
                    pb: 1.5,
                }}
            >
                <Typography variant="h6" sx={{ color: "var(--color-text)" }}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: "var(--color-text-secondary)" }}>
                    <X size={18} />
                </IconButton>
            </DialogTitle>

            {/* ───────── Content ───────── */}
            <DialogContent
                dividers
                sx={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text)",
                    p: 3,
                }}
            >
                {children}
            </DialogContent>

            {/* ───────── Footer ───────── */}
            <DialogActions
                sx={{
                    p: 2,
                    borderTop: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        textTransform: "none",
                        color: "var(--color-text-secondary)",
                        borderColor: "var(--color-border)",
                        "&:hover": {
                            backgroundColor: "var(--color-primary-light)",
                            borderColor: "var(--color-primary)",
                        },
                    }}
                >
                    {cancelLabel}
                </Button>
                {onConfirm && (
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-primary)",
                            "&:hover": {
                                backgroundColor: "var(--color-primary-hover)",
                            },
                        }}
                    >
                        {confirmLabel}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AppDialog;
