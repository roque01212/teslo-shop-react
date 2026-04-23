import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.response";

const API_URL = import.meta.env.VITE_API_URL;

interface Options {
  limit?: number | string;
  offset?: number | string;
  gender?: string;
  sizes?: string;
  maxPrice?: number;
  minPrice?: number;
  query?: string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  const productsWithImageUrls = data.products.map((p) => {
    return {
      ...p,
      images: p.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  });

  return { ...data, products: productsWithImageUrls };
};
