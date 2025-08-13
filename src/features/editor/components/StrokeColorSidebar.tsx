import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import ColorPicker from "./ColorPicker";
import { STROKE_COLOR } from "../constants/editorConstants";
import { StrokeColorSidebarProps } from "@/interfaces/StrokeColorSidebarProps";

const StrokeColorSidebar: FC<StrokeColorSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const colorValue = editor?.getActiveStrokeColor() ?? STROKE_COLOR;

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  const handleChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-color" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Add stroke color to your element."
      />

      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker value={colorValue} onChange={handleChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default StrokeColorSidebar;
