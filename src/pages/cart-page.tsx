import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuMinus,
  LuPlus,
  LuShoppingBag,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import Layout from "../components/layout/layout";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleApplyPromo = () => {
    // Simple promo code logic - in a real app, this would validate against a backend
    if (promoCode.toLowerCase() === "discount20") {
      const discount = cart.totalPrice * 0.2;
      setPromoDiscount(discount);
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping - promoDiscount;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 mt-1 mb-4">
            {cart.items.length} products total
          </p>

          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <LuShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
              >
                <LuArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>

                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6">
                          <div className="flex">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.images[0]}
                                alt={item.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-col">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                  <Link to={`/product/${item.id}`}>
                                    {item.title}
                                  </Link>
                                </h3>
                                <p title="mt-1 text-sm text-gray-500">
                                  {item.brand}
                                </p>
                                {item.color && (
                                  <p className="mt-1 text-sm text-gray-500">
                                    Color: {item.color}
                                  </p>
                                )}
                                {item.size && (
                                  <p className="mt-1 text-sm text-gray-500">
                                    Size: {item.size}
                                  </p>
                                )}
                              </div>
                              <div className="mt-auto md:hidden flex justify-between items-center">
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-sm text-red-500 flex items-center"
                                >
                                  <LuTrash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </button>
                                <span className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:flex col-span-2 items-center justify-center">
                          <span className="text-sm font-medium text-gray-900">
                            ${item.price}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-2 text-gray-500 hover:text-gray-700"
                            >
                              <LuMinus className="h-3 w-3" />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = Number.parseInt(e.target.value);
                                if (!isNaN(val)) {
                                  handleQuantityChange(item.id, val);
                                }
                              }}
                              className="w-10 text-center border-0 focus:ring-0"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-2 text-gray-500 hover:text-gray-700"
                            >
                              <LuPlus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="hidden md:flex col-span-2 items-center justify-center">
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-500"
                          >
                            <LuTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 flex justify-between items-center">
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                    >
                      <LuX className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                    <Link
                      to="/products"
                      className="text-sm text-black hover:text-gray-700 flex items-center"
                    >
                      <LuArrowLeft className="h-4 w-4 mr-1" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="promo"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-gray-900 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-gray-800 transition"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="mt-2 text-sm text-green-600">
                        Promo code applied successfully!
                      </p>
                    )}
                    {promoCode && !promoApplied && (
                      <p className="mt-2 text-sm text-red-600">
                        Invalid promo code.
                      </p>
                    )}
                  </div>

                  <button className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition">
                    Proceed to Checkout
                  </button>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
