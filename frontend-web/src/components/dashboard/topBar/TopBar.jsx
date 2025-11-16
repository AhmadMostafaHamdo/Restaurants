import { Link } from "react-router-dom";
import style from "./style.module.css";
const { topbar, logo } = style;
const TopBar = () => {
  return (
    <div className={topbar}>
      <Link to="/dashboard" className={logo}>
        Food
      </Link>
      <Link to="/dashboard" className={logo}>
        Admin Panel
      </Link>
    </div>
  );
};

export default TopBar;
