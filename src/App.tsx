import { LuArrowRight, LuChevronRight, LuHeart } from "react-icons/lu";
import "./App.css";
import Layout from "./components/layout/layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import BannerSection from "./components/ui/banner-section";
import NewsLetterSection from "./components/ui/newsletter-section";
import BrandsSection from "./components/ui/brands-section";
import BannerPromotionalSection from "./components/ui/banner-promotional-section";


function App() {
  const [activeCategory, setActiveCategory] = useState<string>("featured")
  
  const categories = [
    { id: "featured", name: "Featured" },
    { id: "new", name: "New Arrivals" },
    { id: "bestsellers", name: "Bestsellers" },
    { id: "sale", name: "Sale" },
  ]
  
  const featuredProducts = [
    {
      id: 1,
      name: "Reebok Zig Kinetica 3",
      price: 199.0,
      image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      brand: "Reebok",
      category: "Shoes",
      rating: 4,
      isNew: true,
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: 150.0,
      image: "/placeholder.svg?height=300&width=300",
      brand: "Nike",
      category: "Shoes",
      rating: 5,
      isNew: true,
    },
    {
      id: 3,
      name: "Adidas Ultraboost 22",
      price: 180.0,
      image: "/placeholder.svg?height=300&width=300",
      brand: "Adidas",
      category: "Shoes",
      rating: 4,
      isNew: false,
    },
    {
      id: 4,
      name: "Puma RS-X",
      price: 120.0,
      image: "/placeholder.svg?height=300&width=300",
      brand: "Puma",
      category: "Shoes",
      rating: 4,
      isNew: false,
      discount: 20,
    },
  ]
  // const queryClient = new QueryClient()
  const collections = [
    {
      id: "women",
      name: "Women",
      image: "/placeholder.svg?height=600&width=400",
      count: 1204,
    },
    {
      id: "men",
      name: "Men",
      image: "/placeholder.svg?height=600&width=400",
      count: 932,
    },
    {
      id: "kids",
      name: "Kids",
      image: "/placeholder.svg?height=600&width=400",
      count: 745,
    },
  ]

  return (
    <>
      <Layout>
      
      {/* BANNER */}
      <BannerSection />

       {/* Featured Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="relative group overflow-hidden rounded-lg">
              <div className="h-[400px] overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm mb-4">{collection.count} Products</p>
                  <a href="#" className="inline-flex items-center text-sm font-medium">
                    Shop Collection <LuChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Products</h2>
            <div className="hidden md:flex space-x-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-sm font-medium pb-1 ${
                    activeCategory === category.id ? "border-b-2 border-black" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-white border border-gray-200 rounded-md px-3 py-1 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden group">
                <div className="relative">
                  <div className="h-48 md:h-64 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">New</div>
                  )}
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuHeart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-medium mb-1 line-clamp-1">
                    <Link to={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold">${product.price.toFixed(2)}</div>
                    <button className="text-xs bg-black text-white px-2 py-1 rounded">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to={'/products'} className="inline-flex items-center text-sm font-medium">
              View All Products <LuArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <BannerPromotionalSection />

      {/* Brands Section */}
      <BrandsSection />

      {/* Newsletter */}
      <NewsLetterSection />
      </Layout>
    </>
  );
}

export default App;
