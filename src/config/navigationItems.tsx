import { CalendarDays, LayoutDashboard, PiggyBank, Trophy, UserSearch } from "lucide-react";

export const navigationItems = [
    { icon: <LayoutDashboard />, name: "Dashboard", path: "/dashboard", description: "ภาพรวมระบบออมเงินนักเรียน" },
    { icon: <PiggyBank />, name: "รายการฝาก-ถอน", path: "/transaction", description: "จัดการรายการฝากและถอนเงิน" },
    { icon: <CalendarDays />, name: "รายงานรายวัน", path: "/reports/daily", description: "ดูรายงานฝากขถอนแยกตามวัน" },
    { icon: <UserSearch />, name: "รานงานรายบุคคล", path: "/reports/personal", description: "เลือกนักเรียนเพื่อดูยอดเงิน และประวัติการทำรายการ" },
    { icon: <Trophy />, name: "Leaderboard", path: "/leaderboard", description: "อันดับนักเรียนที่มียอดออมเงินสูงสุด" }
];