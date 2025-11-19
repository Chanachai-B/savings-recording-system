export const API_ENDPOINTS = {
    STUDENT: {
        LIST: { GET: "student/all"},
        GET_STUDENT: { GET: "student/{student_id}"},
        GET_ROW_STUDENT_SHEET: { GET: "student/{student_id}/index"},
        UPDATE_BALANCE: { PUT: "student/{student_id}/update_balance"},
    },
    TRANSACTION: {
        LIST: { GET: "transactions/all" },
        DEPOSIT: { POST: `transactions/deposit` },
        WITHDRAW: { POST: "transactions/withdraw" },
    },
};
