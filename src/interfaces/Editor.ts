import * as fabric from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export interface Editor {
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
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontLineThrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  selectedObjects: fabric.FabricObject[];
  canvas: fabric.Canvas;
}
