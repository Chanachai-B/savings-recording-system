import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    Box,
    Typography,
    InputAdornment,
} from "@mui/material";
import { CalendarDays, CircleDollarSign } from "lucide-react";

interface TransactionFormProps {
    onChange?: (formData: TransactionFormData) => void;
}

export interface TransactionFormData {
    student_id: string;
    student_name: string;
    date: string;
    amount: number;
    note: string;
    type: "deposit" | "withdraw";
}

/** 🔹 ฟอร์มเพิ่มรายการฝาก-ถอน */
const TransactionForm: React.FC<TransactionFormProps> = ({ onChange }) => {
    const [form, setForm] = useState<TransactionFormData>({
        student_id: "",
        student_name: "",
        date: new Date().toISOString().split("T")[0],
        amount: 0,
        note: "",
        type: "deposit",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);
        onChange?.(updated);
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                mt: 1,
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)",
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                ข้อมูลนักเรียน
            </Typography>

            {/* 🔸 รหัสนักเรียน */}
            <TextField
                label="รหัสนักเรียน"
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                    "& label": { color: "var(--color-text-secondary)" },
                    "& input": { color: "var(--color-text)" },
                }}
            />

            {/* 🔸 ชื่อนักเรียน */}
            <TextField
                label="ชื่อนักเรียน"
                name="student_name"
                value={form.student_name}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                    "& label": { color: "var(--color-text-secondary)" },
                    "& input": { color: "var(--color-text)" },
                }}
            />

            {/* 🔸 วันที่ทำรายการ */}
            <TextField
                label="วันที่ทำรายการ"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CalendarDays size={18} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& input": { color: "var(--color-text)" },
                }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
                รายละเอียดรายการ
            </Typography>

            {/* 🔸 ประเภทการทำรายการ */}
            <TextField
                select
                label="ประเภทการทำรายการ"
                name="type"
                value={form.type}
                onChange={handleChange}
                size="small"
                fullWidth
                sx={{
                    "& label": { color: "var(--color-text-secondary)" },
                }}
            >
                <MenuItem value="deposit">ฝาก</MenuItem>
                <MenuItem value="withdraw">ถอน</MenuItem>
            </TextField>

            {/* 🔸 จำนวนเงิน */}
            <TextField
                label="จำนวนเงิน (บาท)"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CircleDollarSign size={18} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& label": { color: "var(--color-text-secondary)" },
                    "& input": { color: "var(--color-text)" },
                }}
            />

            {/* 🔸 หมายเหตุ */}
            <TextField
                label="หมายเหตุ"
                name="note"
                multiline
                rows={3}
                value={form.note}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                    "& label": { color: "var(--color-text-secondary)" },
                    "& textarea": { color: "var(--color-text)" },
                }}
            />
        </Box>
    );
};

export default TransactionForm;
