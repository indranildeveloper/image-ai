import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { TextSidebarProps } from "@/interfaces/TextSidebarProps";
import { Button } from "@/components/ui/button";

const TextSidebar: FC<TextSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas." />

      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => editor?.addText("Textbox")}
          >
            Add a Textbox
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-16 w-full"
            onClick={() =>
              editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold">Add a Heading</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-14 w-full"
            onClick={() =>
              editor?.addText("Subheading", {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold">Add a Subheading</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-10 w-full"
            onClick={() =>
              editor?.addText("Paragraph", {
                fontSize: 32,
              })
            }
          >
            <span className="text-base font-bold">Add a Paragraph</span>
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default TextSidebar;
