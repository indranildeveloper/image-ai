import { useCallback, useEffect } from "react";
import * as fabric from "fabric";
import { UseAutoResizeProps } from "@/interfaces/UseAutoResizeProps";

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setDimensions({
      width,
      height,
    });

    const center = canvas.getCenterPoint();
    const zoomRatio = 0.85;

    const localWorkspace = canvas
      .getObjects()
      // @ts-expect-error name is assigned
      .find((object) => object.name === "clip");

    const scale = fabric.util.findScaleToFit(localWorkspace!, {
      width,
      height,
    });

    const zoom = zoomRatio * scale;
    // @ts-expect-error this is good
    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.x, center.y), zoom);

    if (!localWorkspace) return;

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewPortTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewPortTransform
    )
      return;

    viewPortTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewPortTransform[0];
    viewPortTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewPortTransform[3];

    canvas.setViewportTransform(viewPortTransform);

    localWorkspace
      .clone()
      .then((cloned: fabric.FabricObject) => {
        canvas.clipPath = cloned;
        canvas.requestRenderAll();
      })
      .catch((error) => {
        console.error("Canvas Resize Error: ", error);
      });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
