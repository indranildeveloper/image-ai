import { FC } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { Button } from "@/components/ui/button";
import { filters } from "../constants/filters";
import { FilterSidebarProps } from "@/interfaces/FilterSidebarProps";

const FilterSidebar: FC<FilterSidebarProps> = ({
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
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to selected Image."
      />

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="space-y-2 p-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="h-16 w-full cursor-pointer justify-start px-4 py-2 text-left"
              onClick={() => {
                editor?.changeImageFilter(filter);
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default FilterSidebar;
