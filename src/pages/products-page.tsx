import Layout from "../components/layout/layout";

import type React from "react";

import { useState, useEffect } from "react";
import {LuSlidersHorizontal, LuX } from "react-icons/lu";
import FilterSelections from "../components/filters/filter-selections";
import { useFetchProductCategories } from "../services/ProductCategoryService";
import { useFetchProducts } from "../services/ProductService";
import Pagination from "../components/ui/pagination";
import ProductCard from "../components/product-card";
import FilterPriceRange from "../components/filters/filter-price-range";
import SortProductOptions from "../components/ui/sort-product-options";

interface FilterOption {
  id: string;
  name: string;
  count: number;
  checked: boolean;
}

const ProductsPage = () => {
  const { productCategories, fetchProductCategories } =
    useFetchProductCategories();
  const { products, fetchProducts } = useFetchProducts();

  // const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsPerPage = 20;
  useEffect(() => {
    fetchProductCategories();
  }, []);
  useEffect(() => {
    fetchProducts();
    setTotalPages(Math.ceil(products.length / productsPerPage));
  }, []);

  // State for filters
  const [categoryFilters, setCategoryFilters] = useState<FilterOption[]>([]);

  useEffect(() => {
    if (productCategories && productCategories.length > 0) {
      const filters = productCategories.map((category) => ({
        id: category.slug,
        name: category.name,
        count: 0,
        checked: false,
      }));
      setCategoryFilters(filters);
    }
  }, [productCategories]);

  const [brandFilters, setBrandFilters] = useState<FilterOption[]>([
    { id: "nike", name: "Nike", count: 64, checked: false },
    { id: "adidas", name: "Adidas", count: 52, checked: false },
    { id: "reebok", name: "Reebok", count: 38, checked: false },
    { id: "puma", name: "Puma", count: 29, checked: false },
    { id: "newbalance", name: "New Balance", count: 24, checked: false },
  ]);

  const [colorFilters, setColorFilters] = useState<FilterOption[]>([
    { id: "black", name: "Black", count: 78, checked: false },
    { id: "white", name: "White", count: 64, checked: false },
    { id: "gray", name: "Gray", count: 42, checked: false },
    { id: "blue", name: "Blue", count: 36, checked: false },
    { id: "red", name: "Red", count: 28, checked: false },
  ]);

  const [sizeFilters, setSizeFilters] = useState<FilterOption[]>([
    { id: "40", name: "40", count: 48, checked: false },
    { id: "41", name: "41", count: 56, checked: false },
    { id: "42", name: "42", count: 64, checked: false },
    { id: "43", name: "43", count: 58, checked: false },
    { id: "44", name: "44", count: 42, checked: false },
    { id: "45", name: "45", count: 36, checked: false },
  ]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];
    console.log("Original products:", filtered.length);

    // Apply category filters
    const selectedCategories = categoryFilters
      .filter((f) => f.checked)
      .map((f) => f.id.toLowerCase());
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category.toLowerCase())
      );
    }

    // Apply brand filters
    const selectedBrands = brandFilters
      .filter((f) => f.checked)
      .map((f) => f.name.toLowerCase());
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase())
      );
    }

    // Apply color filters
    const selectedColors = colorFilters
      .filter((f) => f.checked)
      .map((f) => f.name.toLowerCase());
    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (p) => p.color && selectedColors.includes(p.color.toLowerCase())
      );
    }

    // Apply size filters
    const selectedSizes = sizeFilters
      .filter((f) => f.checked)
      .map((f) => f.name);
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (p) => p.size && p.size.some((s) => selectedSizes.includes(s))
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    console.log("After category filter:", filtered.length);

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming id represents the order of addition (higher id = newer)
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalFilteredPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle filter changes
  const handleCategoryFilterChange = (id: string) => {
    console.log(id);
    setCategoryFilters(
      categoryFilters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
    setCurrentPage(1);
  };

  const handleBrandFilterChange = (id: string) => {
    setBrandFilters(
      brandFilters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
    setCurrentPage(1);
  };

  const handleColorFilterChange = (id: string) => {
    setColorFilters(
      colorFilters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
    setCurrentPage(1);
  };

  const handleSizeFilterChange = (id: string) => {
    setSizeFilters(
      sizeFilters.map((filter) =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = Number.parseInt(e.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number];
      newRange[index] = newValue;
      return newRange;
    });
  };

  const handleClearAllFilters = () => {
    setCategoryFilters(
      categoryFilters.map((filter) => ({ ...filter, checked: false }))
    );
    setBrandFilters(
      brandFilters.map((filter) => ({ ...filter, checked: false }))
    );
    setColorFilters(
      colorFilters.map((filter) => ({ ...filter, checked: false }))
    );
    setSizeFilters(
      sizeFilters.map((filter) => ({ ...filter, checked: false }))
    );
    setPriceRange([0, 50000]);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount =
    categoryFilters.filter((f) => f.checked).length +
    brandFilters.filter((f) => f.checked).length +
    colorFilters.filter((f) => f.checked).length +
    sizeFilters.filter((f) => f.checked).length +
    (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0);

  return (
    <div>
      <Layout>
        <div className="min-h-screen bg-white">
          {/* Mobile Filter Button */}
          <div className="md:hidden container mx-auto px-4 py-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-full flex items-center justify-center space-x-2 bg-black text-white py-2 px-4 rounded-md"
            >
              <LuSlidersHorizontal className="h-4 w-4" />
              <span>
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </span>
            </button>
          </div>
          {/* Main Content */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-10 ">
              {/* Sidebar - Desktop */}
              <div className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200">
                <div className="sticky top-4 space-y-6">
                  {/* Filter Header */}
                  <div className="flex justify-between items-center pr-2 ">
                    <h2 className="font-bold text-lg">Filters</h2>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={handleClearAllFilters}
                        className="text-sm cursor-pointer text-gray-500 hover:text-black"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Price Range */}
                  <FilterPriceRange
                    priceRange={priceRange}
                    handlePriceRangeChange={handlePriceRangeChange}
                  />

                  {/* Categories */}
                  <FilterSelections
                    filterData={categoryFilters}
                    filterName={"category"}
                    onChange={handleCategoryFilterChange}
                  />

                  {/* Brands */}
                  <FilterSelections
                    filterData={brandFilters}
                    filterName={"brand"}
                    onChange={handleBrandFilterChange}
                  />

                  {/* Colors */}
                  <FilterSelections
                    filterData={colorFilters}
                    filterName={"color"}
                    onChange={handleColorFilterChange}
                  />

                  {/* Sizes */}
                  <FilterSelections
                    filterData={sizeFilters}
                    filterName={"size"}
                    onChange={handleSizeFilterChange}
                  />
                </div>
              </div>

              {/* Mobile Sidebar */}
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
                  isSidebarOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div
                  className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="font-bold text-lg">Filters</h2>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1"
                      >
                        <LuX className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                      {/* Price Range */}
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-medium mb-4">Price Range</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-sm">${priceRange[0]}</span>
                            <span className="text-sm">${priceRange[1]}</span>
                          </div>
                          <div className="relative">
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
                          </div>
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

                      {/* Categories */}
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-medium mb-4">Categories</h3>
                        <div className="space-y-2">
                          {categoryFilters.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={`mobile-category-${category.id}`}
                                checked={category.checked}
                                onChange={() =>
                                  handleCategoryFilterChange(category.id)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {category.name}{" "}
                                <span className="text-gray-500">
                                  ({category.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Brands */}
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-medium mb-4">Brands</h3>
                        <div className="space-y-2">
                          {brandFilters.map((brand) => (
                            <div key={brand.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-brand-${brand.id}`}
                                checked={brand.checked}
                                onChange={() =>
                                  handleBrandFilterChange(brand.id)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <label
                                htmlFor={`mobile-brand-${brand.id}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {brand.name}{" "}
                                <span className="text-gray-500">
                                  ({brand.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-medium mb-4">Colors</h3>
                        <div className="space-y-2">
                          {colorFilters.map((color) => (
                            <div key={color.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-color-${color.id}`}
                                checked={color.checked}
                                onChange={() =>
                                  handleColorFilterChange(color.id)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <label
                                htmlFor={`mobile-color-${color.id}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {color.name}{" "}
                                <span className="text-gray-500">
                                  ({color.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div>
                        <h3 className="font-medium mb-4">Sizes</h3>
                        <div className="space-y-2">
                          {sizeFilters.map((size) => (
                            <div key={size.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-size-${size.id}`}
                                checked={size.checked}
                                onChange={() => handleSizeFilterChange(size.id)}
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <label
                                htmlFor={`mobile-size-${size.id}`}
                                className="ml-2 text-sm text-gray-700"
                              >
                                {size.name}{" "}
                                <span className="text-gray-500">
                                  ({size.count})
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={handleClearAllFilters}
                          className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium"
                        >
                          Clear all
                        </button>
                        <button
                          onClick={() => setIsSidebarOpen(false)}
                          className="py-2 px-4 bg-black text-white rounded-md text-sm font-medium"
                        >
                          Apply filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1">
                {/* Sort Options */}
                <SortProductOptions
                  filteredProducts={filteredProducts}
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                {/* Products */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalFilteredPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalFilteredPages={totalFilteredPages}
                    handlePageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProductsPage;
