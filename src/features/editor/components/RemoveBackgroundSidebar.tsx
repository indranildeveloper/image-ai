import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { RemoveBackgroundSidebarProps } from "@/interfaces/RemoveBackgroundSidebarProps";
import { AlertTriangleIcon } from "lucide-react";
import { useRemoveBackground } from "@/features/ai/api/useRemoveBackground";

const RemoveBackgroundSidebar: FC<RemoveBackgroundSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const selectedObject = editor?.selectedObjects[0];
  const mutation = useRemoveBackground();

  // @ts-expect-error this is correct
  const currentSelectedImageUrl = selectedObject?._originalElement?.currentSrc;

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  const handleSubmit = () => {
    // TODO: block with paywall
    mutation.mutate(
      {
        image: currentSelectedImageUrl,
      },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      },
    );
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Background Removal"
        description="Remove background from Image using AI."
      />
      {!currentSelectedImageUrl && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="text-muted-foreground size-4" />
          <p>Feature not available for this object!</p>
        </div>
      )}
      {currentSelectedImageUrl && (
        <ScrollArea>
          <div className="space-y-2 p-4">
            <div
              className={cn(
                "bg-muted relative aspect-square overflow-hidden rounded-md transition",
                mutation.isPending && "opacity-50",
              )}
            >
              <Image
                src={currentSelectedImageUrl}
                fill
                alt="Image AI"
                className="object-cover"
              />
            </div>
            <Button
              className="mt-2 w-full"
              disabled={mutation.isPending}
              onClick={handleSubmit}
            >
              Remove Background
            </Button>
          </div>
        </ScrollArea>
      )}

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default RemoveBackgroundSidebar;
