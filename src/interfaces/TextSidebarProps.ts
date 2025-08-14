import { Editor } from "./Editor";
import { ActiveTool } from "@/types/types";

export interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
