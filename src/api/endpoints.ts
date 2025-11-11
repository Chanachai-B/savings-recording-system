export const API_ENDPOINTS = {
    STUDENT: {
        LIST: { GET: "student/all"},
    },
    TRANSACTION: {
        LIST: { GET: "/transactions/all" },
        DEPOSIT: { POST: `/transactions/deposit` },
        WITHDRAW: { POST: "/transactions/withdraw" },
    },
};
