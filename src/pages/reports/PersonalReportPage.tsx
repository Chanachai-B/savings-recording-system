import { useStudents } from "@/contexts/student-context";
import DataTable from "@/components/ui/table";

const PersonalReportPage = () => {
    const { students, loading } = useStudents();

    const header = {
        student_id: "รหัสนักเรียน",
        full_name: "ชื่อ-นามสกุล",
        total_deposit: "ยอดฝาก",
        total_withdrawal: "ยอดถอน",
        balance: "ยอดคงเหลือ",
    };

    const rows = students.map((s) => ({
        student_id: s.student_id,
        full_name: `${s.prefix} ${s.first_name} ${s.last_name}`,
        total_deposit: s.total_deposit || "0",
        total_withdrawal: s.total_withdrawal || "0",
        balance: s.balance || "0",
    }));

    console.log(rows)

    const filterdRow = rows.filter(f => f.balance !== "0");

    return (
        <div className="flex flex-col gap-4">
            <DataTable
                data={filterdRow}
                headerMap={header}
                loading={loading}
            />
        </div>
    );
};

export default PersonalReportPage;
