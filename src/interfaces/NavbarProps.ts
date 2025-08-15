import { ActiveTool } from "@/types/types";
import { Editor } from "./Editor";

export interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
