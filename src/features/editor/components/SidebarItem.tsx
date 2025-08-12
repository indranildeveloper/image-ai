import { FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarItemProps } from "@/interfaces/SidebarItemProps";

const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex aspect-video h-24 w-full flex-col rounded-none p-3 py-4",
        isActive && "bg-muted text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="size-5 shrink-0 stroke-2" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};

export default SidebarItem;
