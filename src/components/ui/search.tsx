"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { LuSearch, LuX } from "react-icons/lu"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import type { ProductDataType } from "../../types/types"


interface SearchBarProps {
  products: ProductDataType[]
  placeholder?: string
  maxResults?: number
}

const Search = ({ products, placeholder = "Search", maxResults = 5 }: SearchBarProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ProductDataType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Handle search query changes
  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setIsOpen(false)
      return
    }

    // Simulate loading state (remove in production if not needed)
    setLoading(true)

    // Debounce search to avoid too many re-renders
    const timer = setTimeout(() => {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )

      setResults(filtered.slice(0, maxResults))
      setIsOpen(true)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, products, maxResults])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }
  // Highlight matching text in search results
  const highlightMatch = (text: string) => {
    if (!text) return null
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) => {
  return index % 2 === 1 ? (
    <span key={index} className="bg-yellow-200">
      {part}
    </span>
  ) : (
    part
  )
})
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-gray-100 rounded-md py-2 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <LuSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <LuX className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-black rounded-full mr-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="p-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{highlightMatch(product.title)}</p>
                      <p className="text-xs text-gray-500">
                        {highlightMatch(product.brand)} • {highlightMatch(product.category)}
                      </p>
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    navigate(`/products?search=${encodeURIComponent(query)}`)
                    setIsOpen(false)
                  }}
                  className="w-full text-center py-2 text-sm text-gray-600 hover:text-black"
                >
                  See all results for "{query}"
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
