export interface TemplateCardProps {
  imgSrc: string;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  width: number;
  height: number;
  isPremium: boolean | null;
}
