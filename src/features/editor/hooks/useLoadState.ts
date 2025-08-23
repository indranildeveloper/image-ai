import { useEffect, useRef } from "react";
import { JSON_KEYS } from "../constants/history";
import { UseLoadStateProps } from "@/interfaces/UseLoadStateProps";

export const useLoadState = ({
  canvas,
  autoZoom,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: UseLoadStateProps) => {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    const dataToLoad = JSON.parse(initialState.current ?? "{}");

    if (!initialized.current && initialState?.current && canvas) {
      canvas
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .loadFromJSON(dataToLoad)
        .then(() => {
          const currentState = canvas.toObject(JSON_KEYS);

          canvasHistory.current = [currentState];
          setHistoryIndex(0);
          autoZoom();
        })
        .catch((error) => {
          console.error(
            "Something went wrong while loading the editor state!",
            error,
          );
        });

      initialized.current = true;
    }
  }, [canvas, autoZoom, initialState, canvasHistory, setHistoryIndex]);
};
