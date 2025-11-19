import { getStudent } from "@/api/student.api";
import { getTransactions } from "@/api/transaction.api";
import type { Student, StudentFinance } from "@/interfaces/student.interface";
import type { Transaction } from "@/interfaces/transaction.interface";
import { createContext, useContext, useEffect, useState } from "react";

interface StudentContextType {
    students: Student[];
    studentFinanceData: StudentFinance[];
    transactions: Transaction[];
    loading: boolean;
    refreshStudents: () => Promise<void>;
    refreshTransactions: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType>({
    students: [],
    studentFinanceData: [],
    transactions: [],
    loading: true,
    refreshStudents: async () => { },
    refreshTransactions: async () => { },
});

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentFinanceData, setStudentFinanceData] = useState<StudentFinance[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getStudent();

            const finance = res.map(s => ({
                student_id: s.student_id,
                total_deposit: s.total_deposit || "0",
                total_withdrawal: s.total_withdrawal || "0",
                balance: s.balance || "0"
            }));

            setStudents(res);
            setStudentFinanceData(finance);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchStudents();
        fetchTransactions();
    }, []);

    return (
        <StudentContext.Provider value={{ students, studentFinanceData, transactions, loading, refreshStudents: fetchStudents, refreshTransactions: fetchTransactions }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudents = () => useContext(StudentContext);
