import { FC } from "react";
import UserButton from "@/features/auth/components/UserButton";

const DashboardNavbar: FC = () => {
  return (
    <nav className="flex h-[68px] w-full items-center p-4">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
