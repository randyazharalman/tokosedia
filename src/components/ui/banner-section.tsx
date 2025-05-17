import React from 'react'

const BannerSection = () => {
  return (
    <div className="relative">
        <div className="h-[500px] md:h-[600px] bg-gray-100 overflow-hidden">
          <img src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp" alt="Hero Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2025</h1>
                <p className="text-lg mb-8">Discover the latest trends and styles for the summer season.</p>
                <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BannerSection