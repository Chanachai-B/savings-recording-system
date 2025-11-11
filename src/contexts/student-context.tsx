import { getStudent } from "@/api/student.api";
import type { Student } from "@/interfaces/student.interface";
import { createContext, useContext, useEffect, useState } from "react";

interface StudentContextType {
    students: Student[];
    loading: boolean;
    refreshStudents: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType>({
    students: [],
    loading: true,
    refreshStudents: async () => { },
});

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getStudent();
            // const data = await res.json();
            setStudents(res);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <StudentContext.Provider value={{ students, loading, refreshStudents: fetchStudents }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudents = () => useContext(StudentContext);
