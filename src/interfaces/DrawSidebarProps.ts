import { Editor } from "./Editor";
import { ActiveTool } from "@/types/types";

export interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
