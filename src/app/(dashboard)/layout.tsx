import { FC } from "react";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardLayoutProps } from "@/interfaces/DashboardLayoutProps";
import DashboardNavbar from "@/components/shared/dashboard/DashboardNavbar";

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-muted h-screen min-h-screen border">
      <DashboardSidebar />
      <div className="flex h-full flex-col lg:pl-[300px]">
        <DashboardNavbar />
        <main className="flex-1 overflow-auto bg-white p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
