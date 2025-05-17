import React from 'react'

const NewsLetterSection = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with our latest offers, new arrivals, and exclusive discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetterSection