"use client";

import { FC, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditor } from "../hooks/useEditor";

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
      <div className="bg-muted h-full flex-1" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
