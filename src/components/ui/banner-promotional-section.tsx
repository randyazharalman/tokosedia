import React from 'react'

const BannerPromotionalSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-white text-3xl font-bold mb-4">Summer Sale</h2>
              <p className="text-gray-300 mb-6">Get up to 50% off on selected items. Limited time offer.</p>
              <div>
                <button className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
                alt="Summer Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default BannerPromotionalSection