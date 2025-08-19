import { FC } from "react";
import { auth } from "@/auth";

const HomePage: FC = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Home Page</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default HomePage;
