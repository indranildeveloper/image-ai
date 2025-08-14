import { ChangeEvent, FC } from "react";
import { FontSizeInputProps } from "@/interfaces/FontSizeInputProps";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const FontSizeInput: FC<FontSizeInputProps> = ({ value, onChange }) => {
  const increment = () => {
    onChange(value + 1);
  };
  const decrement = () => {
    onChange(value - 1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="rounded-r-none border-r-0 p-2"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        className="h-9 w-[50px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={handleChange}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0 p-2"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
