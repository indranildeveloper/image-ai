import { FC } from "react";
import { protectServer } from "@/features/auth/utils/utils";

const HomePage: FC = async () => {
  await protectServer();

  return (
    <div>
      <p>You are logged in!</p>
    </div>
  );
};

export default HomePage;
