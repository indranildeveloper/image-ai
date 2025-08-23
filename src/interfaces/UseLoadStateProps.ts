import { Dispatch, RefObject, SetStateAction } from "react";
import * as fabric from "fabric";

export interface UseLoadStateProps {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: RefObject<string | null | undefined>;
  canvasHistory: RefObject<string[]>;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
}
