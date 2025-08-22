"use client";

import { FC } from "react";
import { useFilePicker } from "use-file-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck } from "react-icons/bs";
import {
  ChevronDownIcon,
  DownloadIcon,
  MousePointerClickIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";
import Logo from "./Logo";
import Hint from "@/components/shared/Hint";
import UserButton from "@/features/auth/components/UserButton";
import { cn } from "@/lib/utils";
import { NavbarProps } from "@/interfaces/NavbarProps";

const Navbar: FC<NavbarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />
      <div className="flex h-full w-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => openFilePicker()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-muted-foreground text-xs">
                  Open a JSON File
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            className={cn(activeTool === "select" && "bg-slate-100")}
            onClick={() => onChangeActiveTool("select")}
          >
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            disabled={!editor?.canUndo()}
            onClick={() => editor?.handleUndo()}
          >
            <Undo2Icon className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            disabled={!editor?.canRedo()}
            onClick={() => editor?.handleRedo()}
          >
            <Redo2Icon className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="text-muted-foreground size-[20px]" />
          <div className="text-muted-foreground text-xs">Saved</div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export <DownloadIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJSON()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-muted-foreground text-xs">
                    Save for later editing.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.savePNG()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for sharing on the web.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJPG()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for printing.
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveSVG()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for editing in vector software.
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
