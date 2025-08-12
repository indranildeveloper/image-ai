"use client";

import { FC } from "react";
import SidebarItem from "./SidebarItem";
import {
  ImageIcon,
  LayoutTemplateIcon,
  SettingsIcon,
  ShapesIcon,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";
import { SidebarProps } from "@/interfaces/SidebarProps";

const Sidebar: FC<SidebarProps> = ({ activeTool, onChangeActiveTool }) => {
  return (
    <aside className="flex h-full w-[100px] flex-col overflow-y-auto border-r bg-white">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplateIcon}
          label="Design"
          isActive={activeTool === "templates"}
          onClick={() => onChangeActiveTool("templates")}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={activeTool === "images"}
          onClick={() => onChangeActiveTool("images")}
        />
        <SidebarItem
          icon={TypeIcon}
          label="Text"
          isActive={activeTool === "text"}
          onClick={() => onChangeActiveTool("text")}
        />
        <SidebarItem
          icon={ShapesIcon}
          label="Shapes"
          isActive={activeTool === "shapes"}
          onClick={() => onChangeActiveTool("shapes")}
        />
        <SidebarItem
          icon={SparklesIcon}
          label="AI"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        />
        <SidebarItem
          icon={SettingsIcon}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => onChangeActiveTool("settings")}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
