import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardSidebarItemProps } from "@/interfaces/DashboardSidebarItemProps";

const DashboardSidebarItem: FC<DashboardSidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center rounded-lg bg-transparent p-3 transition hover:bg-white",
          isActive && "bg-white",
        )}
      >
        <Icon className="mr-2 size-4 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default DashboardSidebarItem;
