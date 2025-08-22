import { FC } from "react";
import { protectServer } from "@/features/auth/utils/utils";
import DashboardBanner from "@/components/shared/dashboard/DashboardBanner";

const HomePage: FC = async () => {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col space-y-6 pb-10">
      <DashboardBanner />
    </div>
  );
};

export default HomePage;
