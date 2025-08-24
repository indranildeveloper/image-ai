import { FC, FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { AISidebarProps } from "@/interfaces/AISidebarProps";
import { Label } from "@/components/ui/label";
import { useGenerateImage } from "@/features/ai/api/useGenerateImage";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

const AISidebar: FC<AISidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const [value, setValue] = useState<string>("");
  const mutation = useGenerateImage();
  const paywall = usePaywall();

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutate(
      { prompt: value },
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
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an Image using AI." />

      <ScrollArea>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Add Description</Label>
            <Textarea
              id="description"
              placeholder="e.g. an astronaut riding a horse on mars, hd, dramatic lighting"
              minLength={3}
              className="h-60"
              required
              disabled={mutation.isPending}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default AISidebar;
