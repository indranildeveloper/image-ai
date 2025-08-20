import { FC } from "react";
import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils/utils";

const HomePage: FC = async () => {
  await protectServer();

  const session = await auth();

  return (
    <div>
      <p>You are logged in!</p>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
};

export default HomePage;
