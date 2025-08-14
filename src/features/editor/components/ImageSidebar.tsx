import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./ToolSidebarHeader";
import ToolSidebarClose from "./ToolSidebarClose";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import { useGetImages } from "@/features/images/api/useGetImages";
import { ImageSidebarProps } from "@/interfaces/ImageSidebarProps";

const ImageSidebar: FC<ImageSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const { data: images, isLoading, isError } = useGetImages();

  const handleCloseToolSidebar = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-40 flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add Images to your canvas."
      />

      {isLoading && (
        <div className="mt-10 flex flex-1 items-center justify-center">
          <LoaderIcon className="text-muted-foreground size-4 animate-spin" />
        </div>
      )}

      {isError && (
        <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="text-muted-foreground size-4" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images!
          </p>
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {images &&
              images.map((image) => {
                return (
                  <button
                    key={image.id}
                    onClick={() => {
                      console.log("Image added", image.urls.regular);
                      editor?.addImage(image.urls.regular);
                    }}
                    className="group bg-muted relative h-[100px] w-full overflow-hidden rounded-sm border transition hover:opacity-75"
                  >
                    <Image
                      src={image.urls.small}
                      alt={image.alt_description ?? "Image"}
                      fill
                      className="object-cover"
                    />
                    <Link
                      href={image.links.html}
                      target="_blank"
                      className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 group-hover:opacity-100 hover:underline"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleCloseToolSidebar} />
    </aside>
  );
};

export default ImageSidebar;
