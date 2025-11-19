import type { Student, StudentFinance } from "@/interfaces/student.interface";
import apiClient, { buildUrl } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const getStudent = async (): Promise<Student[]> => {
    const { data } = await apiClient.get<Student[]>(API_ENDPOINTS.STUDENT.LIST.GET);
    return data;
};

export const getStudentByStudentId = async (student_id: string): Promise<Student> => {
    const endpoint = buildUrl(API_ENDPOINTS.STUDENT.GET_STUDENT.GET, {
        student_id,
    });

    const { data } = await apiClient.get<Student>(endpoint);
    return data;
};

export const getRowStudentSheet = async (student_id: string): Promise<Student> => {
    const endpoint = buildUrl(API_ENDPOINTS.STUDENT.GET_ROW_STUDENT_SHEET.GET, {
        student_id,
    });

    const { data } = await apiClient.get<Student>(endpoint);
    return data;
};

export const updateBalance = async (student_id: string, amount: number, transaction_type: "deposit" | "withdraw", body: StudentFinance[]): Promise<Student> => {
    const endpoint = buildUrl(API_ENDPOINTS.STUDENT.UPDATE_BALANCE.PUT, {
        student_id,
    });

    const { data } = await apiClient.put<Student>(endpoint, body, {
        params: {
            amount,
            transaction_type,
        },
    });

    return data;
};
