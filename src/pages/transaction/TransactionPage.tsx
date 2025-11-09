import { useEffect, useState } from "react";
import {
    createTransactionDeposit,
    createTransactionWithdraw,
    getTransactions,
} from "@/api/transaction.api";
import type { Transaction, TransactionRequest } from "@/interfaces/transaction.interface";
import { TransactionHeaderMap } from "@/models/google-sheet-column.models";
import DataTable from "@/components/ui/table";
import {
    Paper,
    Backdrop,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { CirclePlus } from "lucide-react";
import AppDialog from "@/components/ui/dialog";
import AppButton from "@/components/ui/button";
import type { TransactionFormData } from "./TransactionForm";
import TransactionForm from "./TransactionForm";

const TransactionPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState<TransactionFormData | null>(null);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const [openResult, setOpenResult] = useState(false);

    // ────────────────────────────────
    // 📦 โหลดข้อมูลธุรกรรม
    // ────────────────────────────────
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("โหลดข้อมูลไม่สำเร็จ:", error);
        } finally {
            setLoading(false);
        }
    };

    // ────────────────────────────────
    // 💾 บันทึกข้อมูลธุรกรรม
    // ────────────────────────────────
    const saveTransaction = async (formData: TransactionFormData | null) => {
        if (!formData) return;
        const req: TransactionRequest = {
            student_id: formData.student_id,
            student_name: formData.student_name,
            date: formData.date,
            amount: Number(formData.amount),
            note: formData.note,
        };

        try {
            setSaving(true);

            if (formData.type === "deposit") {
                await createTransactionDeposit(req);
            } else {
                await createTransactionWithdraw(req);
            }

            // ✅ ถ้าสำเร็จ
            setResultMessage("บันทึกข้อมูลเรียบร้อยแล้ว 🎉");
            setOpenResult(true);

            // โหลดข้อมูลใหม่หลังบันทึกสำเร็จ
            await fetchTransactions();
        } catch (err: any) {
            console.error(err);
            setResultMessage("เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง ❌");
            setOpenResult(true);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleClickAdd = (formData: TransactionFormData | null) => {
        saveTransaction(formData);
    };

    // ────────────────────────────────
    // 🧾 UI
    // ────────────────────────────────
    return (
        <div className="flex flex-col gap-4">
            <Paper className="flex justify-end p-4">
                <AppButton
                    variant="primary"
                    startIcon={<CirclePlus />}
                    onClick={() => setOpenDialog(true)}
                >
                    เพิ่มรายการ
                </AppButton>
            </Paper>

            {/* Dialog เพิ่มรายการ */}
            <AppDialog
                open={openDialog}
                title="เพิ่มรายการ"
                onClose={() => setOpenDialog(false)}
                onConfirm={() => {
                    handleClickAdd(formData);
                    setOpenDialog(false);
                }}
                confirmLabel="บันทึก"
                cancelLabel="ปิด"
            >
                <TransactionForm onChange={setFormData} />
            </AppDialog>

            {/* ตารางข้อมูล */}
            <DataTable<Transaction>
                data={transactions}
                headerMap={TransactionHeaderMap}
                loading={loading}
            />

            {/* Backdrop Loading */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: "rgba(0,0,0,0.6)",
                }}
                open={saving}
            >
                <CircularProgress color="inherit" />
                <div className="mt-2 text-sm">กำลังบันทึกข้อมูลลง Google Sheet...</div>
            </Backdrop>

            {/* Dialog แสดงผล */}
            <Dialog open={openResult} onClose={() => setOpenResult(false)}>
                <DialogTitle>ผลการบันทึก</DialogTitle>
                <DialogContent sx={{ pb: 0 }}>{resultMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenResult(false)}>ตกลง</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TransactionPage;
