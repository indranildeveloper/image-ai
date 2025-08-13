import * as fabric from "fabric";

export interface Editor {
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  getActiveFillColor: () => string;
  selectedObjects: fabric.FabricObject[];
  canvas: fabric.Canvas;
  strokeColor: string;
  strokeWidth: number;
}
