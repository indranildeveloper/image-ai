import { LucideIcon } from "lucide-react";

export interface DashboardSidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}
