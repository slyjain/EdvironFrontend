import { Outlet } from "react-router-dom";
import AppBar from "../../components/AppBar";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div>
      <AppBar role={role} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
