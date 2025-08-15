import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolSidebarClose from "./ToolSidebarClose";
import ColorPicker from "./ColorPicker";
import { SettingsSidebarProps } from "@/interfaces/SettingsSidebarProps";

const SettingsSidebar: FC<SettingsSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const workspace = editor?.getWorSpace();

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => workspace?.fill ?? "#ffffff",
    [workspace],
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const changeWidth = (value: string) => {
    setWidth(value);
  };

  const changeHeight = (value: string) => {
    setHeight(value);
  };

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "settings" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change the look and feel of your workspace."
      />

      <ScrollArea>
        <form className="space-y-4 border-b p-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="height"
              type="number"
              value={height}
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="width"
              type="number"
              value={width}
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="space-y-2 p-4">
          <Label>Workspace Background</Label>
          <ColorPicker
            value={background as string}
            onChange={changeBackground}
          />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default SettingsSidebar;
