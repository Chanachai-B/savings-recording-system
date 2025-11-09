import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionPage from "./pages/transaction/TransactionPage";
import DailyReportPage from "./pages/reports/DailyReportPage";
import PersonalReportPage from "./pages/reports/PersonalReportPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import MainLayout from "./components/layout/main-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/reports/daily" element={<DailyReportPage />} />
          <Route path="/reports/personal" element={<PersonalReportPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
