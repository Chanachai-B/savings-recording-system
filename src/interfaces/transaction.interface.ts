export interface Transaction {
    transaction_id: string,
    student_id: string,
    student_name: string,
    date: string,
    deposit: string,
    withdrawal: string,
    balance: string,
    note: string,
    transaction_time_stamp: string
}

export interface TransactionRequest {
    student_id: string,
    student_name: string,
    date: string,
    amount: string,
    note: string
}