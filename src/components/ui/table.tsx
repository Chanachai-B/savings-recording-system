import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";

/**
 * 🔹 Generic DataTable component
 * ใช้แสดงข้อมูลแบบ dynamic โดยใช้ headerMap + data
 */
interface DataTableProps<T extends object> {
    data: T[];
    headerMap: Record<keyof T & string, string>; // key → label (หัวตาราง)
    rowsPerPage?: number;
    onPageChange?: (page: number) => void;
    loading?: boolean;
}

function DataTable<T extends object>({
    data,
    headerMap,
    rowsPerPage = 10,
    onPageChange,
    loading = false,
}: DataTableProps<T>) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPageState, setRowsPerPageState] = React.useState(rowsPerPage);
    const headerKeys = Object.keys(headerMap) as (keyof T)[];

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
        onPageChange?.(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        setRowsPerPageState(value);
        setPage(0);
    };

    if (loading) {
        return (
            <Paper sx={{ p: 3, textAlign: "center" }}>
                กำลังโหลดข้อมูล...
            </Paper>
        );
    }

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    {/* ───────────── Header ───────────── */}
                    <TableHead>
                        <TableRow>
                            {Object.keys(headerMap).map((key) => (
                                <TableCell
                                    key={key}
                                    align="center"
                                    sx={{ fontWeight: 600, backgroundColor: "rgb(245,245,245)" }}
                                >
                                    {headerMap[key as keyof typeof headerMap]}
                                </TableCell>
                            ))}
                        </TableRow>

                    </TableHead>

                    {/* ───────────── Body ───────────── */}
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={headerKeys.length} align="center">
                                    ไม่มีข้อมูล
                                </TableCell>
                            </TableRow>
                        )}

                        {data
                            .slice(page * rowsPerPageState, page * rowsPerPageState + rowsPerPageState)
                            .map((row, rowIndex) => (
                                <TableRow key={rowIndex} hover>
                                    {headerKeys.map((key) => (
                                        <TableCell key={String(key)} align="center">
                                            {/* 🔹 จัดรูปแบบตัวเลขให้สวย */}
                                            {typeof row[key] === "number"
                                                ? row[key].toLocaleString("th-TH", {
                                                    minimumFractionDigits: 2,
                                                })
                                                : (row[key] as any)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        {/* 🔹 เติมแถวว่างให้ครบ rowsPerPage */}
                        {data.length > 0 &&
                            Array.from({
                                length:
                                    rowsPerPageState -
                                    Math.min(rowsPerPageState, data.length - page * rowsPerPageState),
                            }).map((_, i) => (
                                <TableRow key={`empty-${i}`} style={{ height: 53 }}>
                                    <TableCell colSpan={headerKeys.length} />
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ───────────── Pagination ───────────── */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPageState}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="แสดงต่อหน้า"
            />
        </Paper>
    );
}

export default DataTable;
