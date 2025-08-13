import { ActiveTool } from "@/types/types";
import { Editor } from "./Editor";

export interface ToolbarProps {
  key: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
