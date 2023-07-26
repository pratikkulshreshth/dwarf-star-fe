import { Outlet } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Doctors() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Outlet />
    </DashboardLayout>
  );
}

export default Doctors;
