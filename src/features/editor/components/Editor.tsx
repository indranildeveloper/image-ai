"use client";

import { FC, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditor } from "../hooks/useEditor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Footer from "./Footer";

const Editor: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { init } = useEditor();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar />
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
