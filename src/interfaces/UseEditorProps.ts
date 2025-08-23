export interface UseEditorProps {
  defaultState?: string;
  defaultHeight?: number;
  defaultWidth?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
}
