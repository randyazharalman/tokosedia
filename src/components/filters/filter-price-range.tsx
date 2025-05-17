
type FilterPiceRangeProps = {
  priceRange: number[],
  handlePriceRangeChange: (e: React.ChangeEvent<HTMLInputElement>, a:  number ) => void
}

const FilterPriceRange = ({priceRange, handlePriceRangeChange}: FilterPiceRangeProps) => {
  return (
    <div className="border-b border-gray-200 pb-6 ">
      <h3 className="font-medium mb-4">Price Range</h3>
      <div className="space-y-4 pr-2">
        <div className="flex justify-between">
          <span className="text-sm">${priceRange[0]}</span>
          <span className="text-sm">${priceRange[1]}</span>
        </div>
        {/* <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full absolute top-0"
                    />
                  </div> */}
        <div className="flex space-x-2">
          <input
            type="number"
            min="0"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange(e, 0)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
          <span className="text-gray-500 self-center">-</span>
          <input
            type="number"
            min={priceRange[0]}
            max="300"
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange(e, 1)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPriceRange;
