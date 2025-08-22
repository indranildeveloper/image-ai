import { FC } from "react";
import DashboardLogo from "./DashboardLogo";
import DashboardSidebarRoutes from "./DashboardSidebarRoutes";

const DashboardSidebar: FC = () => {
  return (
    <aside className="fixed left-0 hidden h-full w-[300px] shrink-0 flex-col lg:flex">
      <DashboardLogo />
      <DashboardSidebarRoutes />
    </aside>
  );
};

export default DashboardSidebar;
