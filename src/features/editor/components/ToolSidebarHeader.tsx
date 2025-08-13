import { FC } from "react";
import { ToolSidebarHeaderProps } from "@/interfaces/ToolSidebarHeaderProps";

const ToolSidebarHeader: FC<ToolSidebarHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="h-[68px] space-y-1 border-b p-4">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
};

export default ToolSidebarHeader;
