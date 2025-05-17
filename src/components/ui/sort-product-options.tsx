import { LuChevronDown } from "react-icons/lu";
import type { ProductDataType } from "../../types/types";

type SortProductOptionsProps = {
  filteredProducts: ProductDataType[];
  currentPage: number;
  productsPerPage: number;
  sortBy: string;
  setSortBy: (e: string) => void;
};
const SortProductOptions = ({
  filteredProducts,
  currentPage,
  productsPerPage,
  sortBy,
  setSortBy,
}: SortProductOptionsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-500">
        Showing{" "}
        {Math.min(
          filteredProducts.length,
          (currentPage - 1) * productsPerPage + 1
        )}
        -{Math.min(filteredProducts.length, currentPage * productsPerPage)} of{" "}
        {filteredProducts.length} products
      </div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="newest">Newest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <LuChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SortProductOptions;
