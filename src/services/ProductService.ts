import { useState } from "react";
import type { ProductDataType } from "../types/types";
import axiosInstance from "../lib/axios";


export const useFetchProducts =  () => {
  const [products, setProducts] = useState<ProductDataType []>([]);
  const [product, setProduct] = useState<ProductDataType | null>(null);
  const [productsIsLoading, setProductsIsLoading] =  useState<boolean>(false);
  const [productsError, setProductsError] =  useState("")

 const fetchProducts = async () => {
  try {
    setProductsIsLoading(true)
    const response = await axiosInstance.get('/products?limit=0')
    setProducts(response.data.products)
  } catch (error) {
    setProductsError((error as TypeError).message)
  }finally {
    setProductsIsLoading(false)
  }
}

const getProductById = async (id: number) => {
  try {
    setProductsIsLoading(true)
    const response = await axiosInstance.get(`/products/${id}`);
    console.log(response.data);
    setProduct(response.data);
  } catch (error) {
    setProductsError((error as TypeError).message)
  }finally {
    setProductsIsLoading(false)
  }
}

return {
  fetchProducts,
  getProductById,
  product,   // single product
  products,  // all product
  productsIsLoading,
  productsError
}

}
