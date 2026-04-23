import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products-action";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "9";
  const sizes = searchParams.get("sizes") || undefined;
  const query = searchParams.get("query") || "";

  const offset = (+page - 1) * +limit;

  const price = searchParams.get("price") || "any";

  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "any":
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
  }

  return useQuery({
    // todo vinene logica
    queryKey: [
      "products",
      { limit, offset, gender, sizes, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        gender,
        sizes,
        minPrice,
        maxPrice,
        query,
      }),

    staleTime: 60 * 100 * 5,
  });
};
