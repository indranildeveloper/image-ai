import { ActiveTool } from "@/types/types";
import { Editor } from "./Editor";

export interface NavbarProps {
  projectId: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
