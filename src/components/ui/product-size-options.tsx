import { useState } from "react"


interface SizeOption {
  value: string
  label: string
}
const ProductSizeOption = () => {
    const [selectedSize, setSelectedSize] = useState<string>("41")
  
  const sizes: SizeOption[] = [
    { value: "40.5", label: "40.5" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "43.5", label: "43.5" },
    { value: "44", label: "44" },
    { value: "44.5", label: "44.5" },
    { value: "45", label: "45" },
    { value: "46", label: "46" },
  ]

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }
  return (
    <div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-sm">Size</label>
                        <span className="text-sm text-gray-500">EU Men</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size.value}
                            onClick={() => handleSizeSelect(size.value)}
                            className={`py-3 text-center rounded-md ${
                              selectedSize === size.value
                                ? "bg-black text-white"
                                : "bg-white border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                      <a href="#" className="text-sm text-gray-500 mt-2 inline-block">
                        Size guide
                      </a>
                    </div>
    </div>
  )
}

export default ProductSizeOption
