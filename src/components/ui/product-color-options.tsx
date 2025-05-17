import { useState } from "react";

interface ColorOption {
  value: string;
  color: string;
  selected?: boolean;
}

const ProductColorOptions = () => {
  const [selectedColor, setSelectedColor] = useState<string>("white");

  const colors: ColorOption[] = [
    { value: "white", color: "bg-gray-100", selected: true },
    { value: "light-gray", color: "bg-gray-300" },
    { value: "black", color: "bg-black" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <div>
        <label className="block text-sm mb-2">Color</label>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorSelect(color.value)}
              className={`h-10 w-10 rounded-md border ${
                selectedColor === color.value
                  ? "border-black"
                  : "border-gray-200"
              } ${color.color}`}
              aria-label={`Select ${color.value} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductColorOptions;
