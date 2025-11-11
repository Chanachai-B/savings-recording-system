import type { Student } from "@/interfaces/student.interface";
import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const getStudent = async (): Promise<Student[]> => {
    const { data } = await apiClient.get<Student[]>(API_ENDPOINTS.STUDENT.LIST.GET);
    return data;
};