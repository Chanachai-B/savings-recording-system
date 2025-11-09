import type { Transaction, TransactionRequest } from "@/interfaces/transaction.interface";
import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const getTransactions = async (): Promise<Transaction[]> => {
    const { data } = await apiClient.get<Transaction[]>(API_ENDPOINTS.TRANSACTION.LIST.GET);
    return data;
};

export const createTransactionDeposit = async (payload: TransactionRequest) => {
    const { data } = await apiClient.post<Transaction>(API_ENDPOINTS.TRANSACTION.DEPOSIT.POST, payload);
    return data;
};

export const createTransactionWithdraw = async (payload: TransactionRequest) => {
    const { data } = await apiClient.post<Transaction>(API_ENDPOINTS.TRANSACTION.WITHDRAW.POST, payload);
    return data;
};
