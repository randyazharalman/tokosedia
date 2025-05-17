import { useState } from "react";
import axiosInstance from "../lib/axios";

type ProductCategoryType = {
  slug: string,
  name: string,
  url: string,
}

export const useFetchProductCategories = () => {
  const [productCategories, setProductCategories] = useState<ProductCategoryType []>([]);
    // const [productCategory, setProductCategory] = useState<ProductDataType | null>(null);
    const [productCategoriesIsLoading, setProductCategoriesIsLoading] =  useState<boolean>(false);
    const [productCategoriesError, setProductCategoriesError] =  useState("")

    const fetchProductCategories = async () => {
      try {
        setProductCategoriesIsLoading(true);
        const response = await axiosInstance.get('/products/categories');
        const data = response.data;
        setProductCategories(data)
      } catch (error) {
        setProductCategoriesError((error as TypeError).message)
      }finally {
        setProductCategoriesIsLoading(false)
      }
    }

    return {
      fetchProductCategories,
      productCategories,
      productCategoriesIsLoading,
      productCategoriesError
    }
}

