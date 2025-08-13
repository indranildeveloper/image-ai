import { FC } from "react";
import { cn } from "@/lib/utils";
import { ShapeToolProps } from "@/interfaces/ShapeToolProps";

const ShapeTool: FC<ShapeToolProps> = ({
  icon: Icon,
  onClick,
  iconsClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square cursor-pointer rounded-md border p-5"
    >
      <Icon className={cn("h-full w-full", iconsClassName)} />
    </button>
  );
};

export default ShapeTool;
