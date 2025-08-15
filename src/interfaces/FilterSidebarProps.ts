import { Editor } from "./Editor";
import { ActiveTool } from "@/types/types";

export interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
