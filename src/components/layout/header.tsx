import { LuHeart, LuShoppingCart } from "react-icons/lu";

import { Link } from "react-router-dom";
import Search from "../ui/search";
import Navbar from "../ui/navbar";
import { useCart } from "../../hooks/useCart";
import { useFetchProducts } from "../../services/ProductService";
import { useEffect } from "react";


const Header = () => {
  const { cart } = useCart();
  const {products, fetchProducts} = useFetchProducts();

  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <div>
    <header className="border-b border-gray-200 z-10 ">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-bold text-xl">
            CartIN
          </Link>
          <div className="hidden md:flex">
            <Navbar />
          </div>
        </div>

        <div className="hidden md:block w-2/3 max-w-md">
            <Search products={products} placeholder="Search products..." />
          </div>

        <div className="flex items-center space-x-4">
          <Link to={'/cart'} className="relative">
            <LuShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cart.totalItems}
            </span>
          </Link>
          <a href="#">
            <LuHeart className="h-5 w-5" />
          </a>
          <a href="#">
            <div className="h-8 w-8 rounded-full bg-gray-800"></div>
          </a>
        </div>
      </div>
    </header>
          {/* Mobile Navigation */}
          <div className="md:hidden border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
              <div className="flex overflow-x-auto space-x-6 pb-1 no-scrollbar">
                <a href="#" className="text-sm whitespace-nowrap">
                  Women
                </a>
                <a href="#" className="text-sm whitespace-nowrap">
                  Men
                </a>
                <a href="#" className="text-sm whitespace-nowrap">
                  Kids
                </a>
                <a href="#" className="text-sm whitespace-nowrap">
                  Sports
                </a>
                <a href="#" className="text-sm whitespace-nowrap">
                  Brands
                </a>
                <a href="#" className="text-sm whitespace-nowrap">
                  New
                </a>
                <a href="#" className="text-sm whitespace-nowrap text-red-500">
                  Sale
                </a>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Header;
