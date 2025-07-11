import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/dashboard/superDashboard/sidebar/Sidebar";
import TopBar from "../../../components/dashboard/topBar/TopBar";
import style from "../style.module.css";
const { dashboard, dashboardContent } = style;

const SuperDashboard = () => {
  return (
    <div className={dashboard}>
      <TopBar />
      <div className={dashboardContent}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default SuperDashboard;
