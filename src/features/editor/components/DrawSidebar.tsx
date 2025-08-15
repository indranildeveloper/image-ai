import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import ColorPicker from "./ColorPicker";
import { STROKE_COLOR, STROKE_WIDTH } from "../constants/editorConstants";
import { DrawSidebarProps } from "@/interfaces/DrawSidebarProps";

const DrawSidebar: FC<DrawSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const colorValue = editor?.getActiveStrokeColor() ?? STROKE_COLOR;
  const strokeWidthValue = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;

  const handleCloseToolSidebar = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool("select");
  };

  const handleColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const handleChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Draw Mode"
        description="Modify brush settings."
      />

      <ScrollArea>
        <div className="space-y-4 border-b p-4 pb-6">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[strokeWidthValue]}
            onValueChange={(values) => handleChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="space-y-6 p-4">
          <ColorPicker value={colorValue} onChange={handleColorChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default DrawSidebar;
