import { FC } from "react";
import Hint from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import { MinimizeIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { FooterProps } from "@/interfaces/FooterProps";

const Footer: FC<FooterProps> = ({ editor }) => {
  return (
    <footer className="z-[49] h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-white p-2 px-4">
      <Hint label="Zoom In" side="top">
        <Button
          onClick={() => editor?.zoomIn()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomInIcon className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom Out" side="top">
        <Button
          onClick={() => editor?.zoomOut()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <ZoomOutIcon className="size-4" />
        </Button>
      </Hint>
      <Hint label="Reset" side="top">
        <Button
          onClick={() => editor?.autoZoom()}
          size="icon"
          variant="ghost"
          className="h-full"
        >
          <MinimizeIcon className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
