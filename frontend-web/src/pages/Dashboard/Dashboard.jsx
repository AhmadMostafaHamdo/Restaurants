import { Col, Row } from "react-bootstrap";
import SideBar from "../../components/dashboard/sideBar/SideBar";
import TopBar from "../../components/dashboard/topBar/TopBar";
import style from "./style.module.css";
import { Outlet } from "react-router-dom";
const { dashboard, dashboardContent } = style;
const Dashboard = () => {
  return (
    <div className={dashboard}>
      <TopBar />
      <div className={dashboardContent}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
