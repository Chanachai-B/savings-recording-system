import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
    TextField,
    Box,
    Typography,
    InputAdornment,
    Autocomplete,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
} from "@mui/material";
import { CalendarDays, CircleDollarSign, Search } from "lucide-react";
import { useStudents } from "@/contexts/student-context";

export interface TransactionFormData {
    student_id: string;
    student_name: string;
    date: string;
    amount: number;
    note: string;
    type: "" | "deposit" | "withdraw";
}

export interface TransactionFormProps {
    onChange?: (data: TransactionFormData) => void;
}

export interface TransactionFormRef {
    validateForm: () => boolean;
    getFormData: () => TransactionFormData;
    resetForm: () => void;
}

const TransactionForm = forwardRef<TransactionFormRef, TransactionFormProps>(
    ({ onChange }, ref) => {
        const { students } = useStudents();
        const [form, setForm] = useState<TransactionFormData>({
            student_id: "",
            student_name: "",
            date: new Date().toISOString().split("T")[0],
            amount: 0,
            note: "",
            type: "",
        });

        const [errors, setErrors] = useState({
            student_id: "",
            type: "",
            amount: "",
        });

        const validateForm = () => {
            const newErrors = { student_id: "", type: "", amount: "" };
            if (!form.student_id) newErrors.student_id = "กรุณาเลือกนักเรียน";
            if (!form.type) newErrors.type = "กรุณาเลือกประเภทการทำรายการ";
            if (!form.amount || form.amount <= 0)
                newErrors.amount = "กรุณากรอกจำนวนเงินที่ถูกต้อง";
            setErrors(newErrors);
            return !Object.values(newErrors).some((v) => v);
        };

        useImperativeHandle(ref, () => ({
            validateForm,
            getFormData: () => form,
            resetForm: () => {
                setForm({
                    student_id: "",
                    student_name: "",
                    date: new Date().toISOString().split("T")[0],
                    amount: 0,
                    note: "",
                    type: "",
                });
                setErrors({ student_id: "", type: "", amount: "" });
            },
        }));

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
            const updated = { ...form, [name]: value };
            setForm(updated);
            onChange?.(updated);
        };

        const handleSelectStudent = (_: any, value: any | null) => {
            if (value) {
                const updated = {
                    ...form,
                    student_id: value.student_id,
                    student_name: `${value.prefix} ${value.first_name} ${value.last_name}`,
                };
                setForm(updated);
                onChange?.(updated);
                setErrors((prev) => ({ ...prev, student_id: "" }));
            }
        };

        return (
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    ข้อมูลนักเรียน
                </Typography>

                <Autocomplete
                    options={students}
                    getOptionLabel={(option) =>
                        `${option.student_id} - ${option.prefix} ${option.first_name} ${option.last_name} (${option.number})`
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="ค้นหานักเรียน"
                            size="small"
                            error={!!errors.student_id}
                            helperText={errors.student_id}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    onChange={handleSelectStudent}
                    noOptionsText="ไม่พบนักเรียน"
                />

                <TextField label="รหัสนักเรียน" value={form.student_id} disabled fullWidth size="small" />
                <TextField label="ชื่อนักเรียน" value={form.student_name} disabled fullWidth size="small" />

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
                />

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
                    รายละเอียดรายการ
                </Typography>
                <RadioGroup
                    name="type"
                    value={form.type}
                    onChange={(e) => {
                        const updated = { ...form, type: e.target.value as "deposit" | "withdraw" };
                        setForm(updated);
                        onChange?.(updated);
                        setErrors((prev) => ({ ...prev, type: "" }));
                    }}
                    sx={{ flexDirection: "row", gap: 2 }}
                >
                    <FormControlLabel value="deposit" control={<Radio />} label="ฝาก" />
                    <FormControlLabel value="withdraw" control={<Radio />} label="ถอน" />
                </RadioGroup>
                {errors.type && <FormHelperText error>{errors.type}</FormHelperText>}

                <TextField
                    label="จำนวนเงิน (บาท)"
                    name="amount"
                    type="text"
                    value={form.amount || ""}
                    error={!!errors.amount}
                    helperText={errors.amount}
                    onChange={(e) => {
                        const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                        const updated = { ...form, amount: Number(onlyNumber) || 0 };
                        setForm(updated);
                        onChange?.(updated);
                        setErrors((prev) => ({ ...prev, amount: "" }));
                    }}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CircleDollarSign size={18} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="หมายเหตุ"
                    name="note"
                    multiline
                    rows={3}
                    value={form.note}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                />
            </Box>
        );
    }
);

export default TransactionForm;
