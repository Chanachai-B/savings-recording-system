import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                404 - Page Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                ไม่พบหน้าที่คุณต้องการ — อาจจะถูกลบหรือย้ายไปที่อื่นแล้ว
            </p>

            <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/dashboard")}
            >
                กลับไปหน้าแรก
            </Button>
        </div>
    );
};

export default NotFound;
