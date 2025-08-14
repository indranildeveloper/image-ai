"use client";

import { FC } from "react";
import { ToolbarProps } from "@/interfaces/ToolbarProps";
import Hint from "@/components/shared/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { isTextType } from "../utils/utils";

const Toolbar: FC<ToolbarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isTextSelected = isTextType(selectedObjectType);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom">
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-slate-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>
      {!isTextSelected && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Stroke Color" side="bottom">
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-slate-100")}
            >
              <div
                className="size-4 rounded-sm border-2 bg-white"
                style={{
                  borderColor: strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}
      {!isTextSelected && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Stroke Width" side="bottom">
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-slate-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex h-full items-center justify-center">
        <Hint label="Bring Forward" side="bottom">
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Send Backward" side="bottom">
          <Button
            onClick={() => editor?.sendBackward()}
            size="icon"
            variant="ghost"
          >
            <ArrowDownIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom">
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-slate-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
