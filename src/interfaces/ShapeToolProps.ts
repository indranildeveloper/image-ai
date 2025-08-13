import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconsClassName?: string;
}
