import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from "../constants/editorConstants";
import { StrokeWidthSidebarProps } from "@/interfaces/StrokeWidthSidebarProps";

const StrokeWidthSidebar: FC<StrokeWidthSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const strokeWidthValue = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;
  const strokeTypeValue =
    editor?.getActiveStrokeDashArray() ?? STROKE_DASH_ARRAY;

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  const handleChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const handleChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Modify the stroke of your element."
      />

      <ScrollArea>
        <div className="space-y-4 border-b p-4 pb-6">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[strokeWidthValue]}
            onValueChange={(values) => handleChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="space-y-4 border-b p-4 pb-6">
          <Label className="text-sm">Stroke Type</Label>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start px-4 py-6 text-left",
              JSON.stringify(strokeTypeValue) === `[0,0]` &&
                "border-primary border-2",
            )}
            onClick={() => handleChangeStrokeType([0, 0])}
          >
            <div className="w-full rounded-full border-4 border-black" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start px-4 py-6 text-left",
              JSON.stringify(strokeTypeValue) === `[5,5]` &&
                "border-primary border-2",
            )}
            onClick={() => handleChangeStrokeType([5, 5])}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black" />
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default StrokeWidthSidebar;
