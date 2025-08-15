import * as fabric from "fabric";

export interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (object: fabric.FabricObject[]) => void;
  clearSelectionCallback?: () => void;
  save: () => void;
}
