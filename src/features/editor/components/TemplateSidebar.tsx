import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { AlertTriangleIcon, CrownIcon, Loader2Icon } from "lucide-react";
import {
  TTemplatesResponseType,
  useGetTemplates,
} from "@/features/projects/api/useGetTemplates";
import { useConfirm } from "@/hooks/useConfirm";
import { TemplateSidebarProps } from "@/interfaces/TemplateSidebarProps";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

const TemplateSidebar: FC<TemplateSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to replace the current project with this template.",
  });
  const {
    data: templates,
    isLoading,
    isError,
  } = useGetTemplates({
    limit: "20",
    page: "1",
  });
  const paywall = usePaywall();

  const handleTemplateClick = async (
    template: TTemplatesResponseType["data"][0],
  ) => {
    if (template.isPremium && paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    const ok = await confirm();

    if (ok) {
      editor?.loadJSON(template.json);
    }
  };

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "templates" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started."
      />

      {isLoading && (
        <div className="mt-10 flex flex-1 items-center justify-center">
          <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
        </div>
      )}

      {isError && (
        <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch templates!
          </p>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {templates &&
              templates.map((template) => {
                return (
                  <button
                    key={template.id}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => handleTemplateClick(template)}
                    className="group bg-muted relative w-full overflow-hidden rounded-sm border transition hover:opacity-75"
                    style={{
                      aspectRatio: `${template.width}/${template.height}`,
                    }}
                  >
                    <Image
                      src={template.thumbnailUrl || ""}
                      alt={template.name || "Template"}
                      fill
                      className="object-cover"
                    />
                    {template.isPremium && (
                      <div className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/50">
                        <CrownIcon className="size-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 group-hover:opacity-100">
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
      <ConfirmDialog />
    </aside>
  );
};

export default TemplateSidebar;
