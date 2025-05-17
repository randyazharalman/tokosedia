import { useEffect } from "react";
import { useFetchProducts } from "../services/ProductService";
import ProductCard from "./product-card";

// type ProductListProps = {
//   data: ProductDataType [];
// };
const ProductList = () => {
  const { products, productsIsLoading, productsError, fetchProducts } =
  useFetchProducts();
  
  useEffect(() => {
    fetchProducts(); 
  }, []);
  return (
    <div>
    <div className="flex flex-wrap justify-center  gap-6 p-4 items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    {productsIsLoading && <p>Loading ...</p>}
    {productsError && <p>{productsError}</p>}
    </div>
    
  );
};

export default ProductList;
