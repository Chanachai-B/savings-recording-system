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

interface DataTableProps<T extends object> {
    data: T[];
    headerMap: Record<keyof T & string, string>;
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
            <Paper
                sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                }}
            >
                กำลังโหลดข้อมูล...
            </Paper>
        );
    }

    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderRadius: 2,
            }}
        >
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    {/* ───────────── Header ───────────── */}
                    <TableHead>
                        <TableRow>
                            {Object.keys(headerMap).map((key) => (
                                <TableCell
                                    key={key}
                                    align="center"
                                    sx={{
                                        fontWeight: 600,
                                        backgroundColor: "var(--color-surface)",
                                        color: "var(--color-text)",
                                        borderBottom: "1px solid var(--color-border)",
                                    }}
                                >
                                    {headerMap[key as keyof typeof headerMap] as React.ReactNode}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* ───────────── Body ───────────── */}
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={headerKeys.length}
                                    align="center"
                                    sx={{
                                        color: "var(--color-text-secondary)",
                                        borderBottom: "1px solid var(--color-border)",
                                    }}
                                >
                                    ไม่มีข้อมูล
                                </TableCell>
                            </TableRow>
                        )}

                        {data
                            .slice(page * rowsPerPageState, page * rowsPerPageState + rowsPerPageState)
                            .map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    hover
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "var(--color-primary-hover, rgba(16,185,129,0.05))",
                                        },
                                    }}
                                >
                                    {headerKeys.map((key) => (
                                        <TableCell
                                            key={String(key)}
                                            align="center"
                                            sx={{ borderBottom: "1px solid var(--color-border)" }}
                                        >
                                            {typeof row[key] === "number"
                                                ? row[key].toLocaleString("th-TH", {
                                                    minimumFractionDigits: 2,
                                                })
                                                : (row[key] as any)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        {/* เติมแถวว่างให้ครบ rowsPerPage */}
                        {data.length > 0 &&
                            Array.from({
                                length:
                                    rowsPerPageState -
                                    Math.min(rowsPerPageState, data.length - page * rowsPerPageState),
                            }).map((_, i) => (
                                <TableRow key={`empty-${i}`} style={{ height: 53 }}>
                                    <TableCell
                                        colSpan={headerKeys.length}
                                        sx={{ borderBottom: "1px solid var(--color-border)" }}
                                    />
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
                sx={{
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text-secondary)",
                    borderTop: "1px solid var(--color-border)",
                }}
            />
        </Paper>
    );
}

export default DataTable;
