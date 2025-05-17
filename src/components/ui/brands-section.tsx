import React from 'react'

const BrandsSection = () => {
  return (
    <div>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8">
            {["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Under Armour"].map((brand) => (
              <div key={brand} className="bg-white rounded-lg p-4 flex items-center justify-center h-20">
                <span className="font-bold text-gray-800">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandsSection