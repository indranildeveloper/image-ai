import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const DashboardLogo: FC = () => {
  return (
    <Link href="/">
      <div className="flex h-[68px] items-center gap-x-2 px-4 transition hover:opacity-75">
        <div className="relative size-8">
          <Image src="/logo.svg" alt="Image AI" fill />
        </div>
        <h1 className="font-sans text-xl font-bold">Image AI</h1>
      </div>
    </Link>
  );
};

export default DashboardLogo;
