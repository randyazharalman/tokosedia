import { useEffect, useState } from "react";
import { LuHeart, LuShoppingCart, LuStar } from "react-icons/lu";
import Layout from "../components/layout/layout";
import { useFetchProducts } from "../services/ProductService";
import { useParams } from "react-router-dom";
import ProductSizeOption from "../components/ui/product-size-options";
import ProductColorOptions from "../components/ui/product-color-options";
import Breadcrumbs from "../components/ui/breadcumb";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ]);

  const [activeImage, setActiveImage] = useState<number>(0);

  const { product, productsIsLoading, productsError, getProductById } =
    useFetchProducts();
  console.log(product);

  useEffect(() => {
    if (productId) {
      const id = parseInt(productId);
      if (!isNaN(id)) {
        getProductById(id);
      }
    }
  }, [productId]);

  useEffect(() => {
    if (product?.images) {
      setImages(product.images);
    }
  }, [product]);

  // const images = [
  //   "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  //   "/placeholder.svg?height=500&width=500",
  // ]

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white p-5">
        {productsIsLoading && <p>Loading ...</p>}
        {productsError && <p>{productsError}</p>}

        {/* Breadcrumbs */}
        <Breadcrumbs
          category={product?.category}
          productTile={product?.title}
        />

        {/* Product Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={
                    images[activeImage] ||
                    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
                  }
                  alt={product?.title ? product?.title : ""}
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${
                      activeImage === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
                {images.length > 4 && (
                  <button className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-sm">
                    +{images.length - 4} more
                  </button>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="bg-black rounded-full h-8 w-8 flex items-center justify-center">
                    <span className="text-white text-xs">
                      {product?.brand?.charAt(0)}
                    </span>
                  </div>
                  <span>{product?.brand}</span>
                </div>
                <span className="text-gray-400 text-sm">{product?.sku}</span>
              </div>

              <h1 className="text-2xl font-bold">{product?.title}</h1>

              <div className="flex items-center gap-1">
                <span className=" text-sm text-gray-500">
                  {product?.rating}
                </span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <LuStar
                      key={i}
                      className={`h-3 w-3 ${
                        product?.rating !== undefined &&
                        i < Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product?.reviews.length} reviews
                </span>
              </div>

              <div className="text-3xl font-bold">${product?.price}</div>
              <div className="flex flex-col gap-4">
                <p>
                  Shiping Information:{" "}
                  <span className="text-gray-500 font-semibold">
                    {product?.shippingInformation}
                  </span>
                </p>
                <p>
                  Stock:{" "}
                  <span className="text-gray-500 font-semibold">
                    {product?.stock}
                  </span>
                </p>
                <p>
                  {" "}
                  <span className="text-gray-500 font-bold">
                    {product?.description}
                  </span>
                </p>
                {product?.color && <ProductColorOptions />}
                {product?.size && <ProductSizeOption />}
              </div>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button className="bg-black cursor-pointer text-white rounded-md py-4 px-6 flex-grow flex items-center justify-center">
                    <LuShoppingCart className="h-5 w-5 mr-2" />
                    Checkout Now
                  </button>
                  <button className="bg-yellow-400 cursor-pointer text-white rounded-md py-4 px-6 flex-grow flex items-center justify-center">
                    <LuShoppingCart className="h-5 w-5 mr-2" />
                    Add to cart
                  </button>
                  <button className="border cursor-pointer border-gray-200 rounded-md p-4">
                    <LuHeart className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center text-sm">
                  <LuShoppingCart className="h-4 w-4 mr-2" />
                  <span>Free delivery on orders over $30.0</span>
                </div>

                <div className="mt-8 border-t pt-8">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-8">
                      <a
                        href="#"
                        className="py-4 text-sm border-transparent border-b-2 hover:text-gray-700 hover:border-gray-300"
                      >
                        Details
                      </a>
                      <a
                        href="#"
                        className="py-4 text-sm border-b-2 border-black font-medium"
                      >
                        Reviews
                      </a>
                      <a
                        href="#"
                        className="py-4 text-sm border-transparent border-b-2 hover:text-gray-700 hover:border-gray-300"
                      >
                        Discussion
                      </a>
                    </nav>
                  </div>

                  <div className="py-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="relative">
                        <select className="appearance-none bg-transparent pr-8 py-1 text-sm font-medium focus:outline-none">
                          <option>Newest</option>
                          <option>Highest Rated</option>
                          <option>Lowest Rated</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                          <svg
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-6">
                      {/* Review 1 */}
                      {product?.reviews.map((review) => {
                        return (
                          <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-start">
                              <img
                                src={`https://randomuser.me/api/portraits/women/${review.comment.length}.jpg`}
                                alt="Helen M."
                                className="h-10 w-10 rounded-full mr-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">
                                      {review.reviewerName}
                                    </h4>
                                    <div className="flex items-center mt-1">
                                      <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <LuStar
                                            key={star}
                                            className={`h-4 w-4 ${
                                              star <= review.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="ml-2 text-xs text-gray-500">
                                        {review.date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="mt-3 text-sm">{review.comment}</p>
                                <div className="mt-3 flex items-center space-x-4">
                                  <button className="text-xs text-gray-500 flex items-center">
                                    <span>Reply</span>
                                  </button>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                      />
                                    </svg>
                                    <span>45</span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                                      />
                                    </svg>
                                    <span>0</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
