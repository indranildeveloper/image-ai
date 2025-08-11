import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative size-8 shrink-0">
        <Image
          src="/logo.svg"
          className="shrink-0 transition hover:opacity-75"
          alt="Image AI"
          fill
        />
      </div>
    </Link>
  );
};

export default Logo;
