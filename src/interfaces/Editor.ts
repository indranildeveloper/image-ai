import * as fabric from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export interface Editor {
  autoZoom: () => void;
  changeImageFilter: (value: string) => void;
  addImage: (value: string) => void;
  deleteObject: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  changeOpacity: (value: number) => void;
  getActiveOpacity: () => number;
  bringForward: () => void;
  sendBackward: () => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeFontFamily: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontLineThrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeTextAlign: (value: ITextboxOptions["textAlign"]) => void;
  changeFontSize: (value: number) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  getWorSpace: () =>
    | fabric.FabricObject<
        Partial<fabric.FabricObjectProps>,
        fabric.SerializedObjectProps,
        fabric.ObjectEvents
      >
    | undefined;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontLineThrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveTextAlign: () => ITextboxOptions["textAlign"];
  getActiveFontSize: () => number;
  copyObject: () => void;
  pasteObject: () => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  changeBackground: (value: string) => void;
  changeSize: (value: { width: number; height: number }) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  selectedObjects: fabric.FabricObject[];
  canvas: fabric.Canvas;
}
