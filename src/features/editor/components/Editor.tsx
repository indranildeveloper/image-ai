"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useEditor } from "../hooks/useEditor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import ShapeSidebar from "./ShapeSidebar";
import { ActiveTool } from "@/types/types";

const Editor: FC = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { init } = useEditor();

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
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />
        <main className="bg-muted relative flex flex-1 flex-col overflow-auto">
          <Toolbar />
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
