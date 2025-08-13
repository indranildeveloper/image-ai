import { ActiveTool } from "@/types/types";
import { Editor } from "./Editor";

export interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
