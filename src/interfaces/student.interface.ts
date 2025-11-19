export interface Student {
    academic_year: string
    classroom: string
    number: string
    student_id: string
    prefix: string
    first_name: string
    last_name: string
    total_deposit: string
    total_withdrawal: string
    balance: string
}

export interface StudentFinance {
    student_id: string
    total_deposit: string
    total_withdrawal: string
    balance: string
}