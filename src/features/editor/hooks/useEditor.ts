import { useCallback, useMemo, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./useAutoResize";
import { BuildEditorProps } from "@/types/types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "../constants/editorConstants";
import { Editor } from "@/interfaces/Editor";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkSpace = () => {
    return (
      canvas
        .getObjects()
        // @ts-expect-error name is assigned
        .find((object) => object.name === "clip")
    );
  };

  const centerObject = (object: fabric.FabricObject) => {
    const workspace = getWorkSpace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.FabricObject) => {
    centerObject(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 20,
        ry: 20,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {
            x: 0,
            y: 0,
          },
          {
            x: WIDTH,
            y: 0,
          },
          {
            x: WIDTH / 2,
            y: HEIGHT,
          },
        ],
        {
          ...TRIANGLE_OPTIONS,
        },
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {
            x: WIDTH / 2,
            y: 0,
          },
          {
            x: WIDTH,
            y: HEIGHT / 2,
          },
          {
            x: WIDTH / 2,
            y: HEIGHT,
          },
          {
            x: 0,
            y: HEIGHT / 2,
          },
        ],
        {
          ...DIAMOND_OPTIONS,
        },
      );

      addToCanvas(object);
    },
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }

    return undefined;
  }, [canvas]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      // Set the control styles
      fabric.InteractiveFabricObject.ownDefaults = {
        ...fabric.InteractiveFabricObject.ownDefaults,
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      };

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setDimensions({
        width: initialContainer.offsetWidth,
        height: initialContainer.offsetHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [],
  );

  return { init, editor };
};
