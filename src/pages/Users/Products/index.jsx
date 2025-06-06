//

import React, { useState, useEffect } from "react";
// auth
import useAuth from "../../../hooks/useAuth";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
// action
import { getProducts } from "../../../redux/slices/products";
// shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// icons
import { ShoppingCart, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// ----------------------------------------

export default function Products() {
  const dispatch = useDispatch();
  const { userRole } = useAuth();

  const [page, setPage] = useState(1);

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ offset: 0, limit: 12 }, userRole));
  }, [dispatch]);

  const goToPreviousPage = (currentPage) => {
    dispatch(
      getProducts({ offset: (currentPage - 1) * 12, limit: 12 }, userRole)
    );
    setPage(currentPage);
  };

  const goToNextPage = (currentPage) => {
    dispatch(
      getProducts({ offset: (currentPage - 1) * 12, limit: 12 }, userRole)
    );
    setPage(currentPage);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  }

  return (
    <div className="ml-4">
      <div className="flex my-5">
        <p className="font-semibold text-gray-700">Users: Products</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {products?.products?.map((product) => {
          return (
            <Card
              className="w-full max-w-xs rounded-xl shadow-md border"
              key={product.id}
            >
              <CardHeader>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP2_fg-TaBTO6NqpgNyBO_PFUwoE-sV347wQ&s"
                  alt="Product"
                  className="w-full h-40 object-cover rounded-lg"
                />

                <CardTitle className="text-lg font-semibold mt-1">
                  {product?.title ?? ""}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-gray-500 text-sm">
                  {product?.title_description ?? ""}
                </p>

                <div className="flex justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-normal line-through text-gray-500">
                      {product?.actual_price}€
                    </span>
                    &nbsp;
                    <span className="font-bold text-base">
                      {product?.discounted_price}€
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <ShoppingCart />
                    </Button>
                    <Button size="sm" className="cursor-pointer">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="ml-auto flex justify-center mt-4 mr-3 items-center gap-4 lg:ml-0">
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          disabled={page === Math.floor(products?.pagination?.totalCount / 10)}
          onClick={() => goToPreviousPage(page - 1)}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon />
        </Button>

        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {`Page ${page} of ${Math.ceil(products.pagination?.totalCount / 12)}`}
        </div>

        <Button
          variant="outline"
          className="size-8"
          size="icon"
          disabled={page === Math.ceil(products?.pagination?.totalCount / 12)}
          onClick={() => goToNextPage(page + 1)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}
