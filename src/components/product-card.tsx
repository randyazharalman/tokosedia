import { Link } from "react-router-dom";
import type { ProductDataType } from "../types/types";
import { LuHeart, LuStar } from "react-icons/lu";
import { useCart } from "../hooks/useCart";
import { CartProvider, type CartItem } from "../context/cart-context";

type ProductCardProps = {
  product: ProductDataType
};

const ProductCard = ({ product }: ProductCardProps) => {
  const {addToCart} = useCart();
    const handleAddToCart = (product: CartItem) => {
    addToCart(product);
  };
  return (
    <div>
      <CartProvider>
      {/* <Link to={`/product/${product.id}`}> */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"> */}
        <div
          key={product.id}
          onClick={() => console.log(product.category)}
          className="bg-white rounded-lg overflow-hidden group border border-gray-100"
        >
          <div className="relative">
            <div className="h-48 overflow-hidden">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* {product.isNew && (
                              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">New</div>
                            )} */}
            {product.discountPercentage && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discountPercentage.toFixed()}%
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
                {product.title}
              </Link>
            </h3>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <LuStar
                  key={i}
                  className={`h-3 w-3 ${
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="font-bold">${product.price.toFixed(2)}</div>
              <button
                onClick={() =>
                  handleAddToCart({
                    ...product,
                    quantity: 1,
                  })
                }
                className="text-xs cursor-pointer bg-black text-white px-2 py-1 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      {/* </Link> */}
      </CartProvider>
    </div>
  );
};

export default ProductCard;
