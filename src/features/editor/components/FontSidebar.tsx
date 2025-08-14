import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { FontSidebarProps } from "@/interfaces/FontSidebarProps";
import { Button } from "@/components/ui/button";
import { fonts } from "../constants/fonts";

const FontSidebar: FC<FontSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const currentFontFamilyValue = editor?.getActiveFontFamily();

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Font" description="Modify the font family." />

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="space-y-2 p-4">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "h-16 w-full cursor-pointer justify-start px-4 py-2 text-left",
                currentFontFamilyValue === font && "border-primary border-2",
              )}
              style={{
                fontFamily: font,
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default FontSidebar;
