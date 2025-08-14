"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useEditor } from "../hooks/useEditor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import ShapeSidebar from "./ShapeSidebar";
import FillColorSidebar from "./FillColorSidebar";
import StrokeColorSidebar from "./StrokeColorSidebar";
import StrokeWidthSidebar from "./StrokeWidthSidebar";
import OpacitySidebar from "./OpacitySidebar";
import TextSidebar from "./TextSidebar";
import { SELECTION_DEPENDENT_TOOLS } from "../constants/editorConstants";
import { ActiveTool } from "@/types/types";

const Editor: FC = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClearSelection = useCallback(() => {
    if (SELECTION_DEPENDENT_TOOLS.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: handleClearSelection,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose().catch((error) => {
        console.log("Canvas Error: ", error);
      });
    };
  }, [init]);

  const handleChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        // TODO: Enable draw mode
      }

      if (activeTool === "draw") {
        // TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool],
  );

  return (
    <div className="flex h-screen flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={handleChangeActiveTool}
      />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <main className="bg-muted relative flex flex-1 flex-col overflow-auto">
          <Toolbar
            key={JSON.stringify(editor?.canvas?.getActiveObject())}
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={handleChangeActiveTool}
          />
          <div
            className="bg-muted h-[calc(100%-124px)] flex-1"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
