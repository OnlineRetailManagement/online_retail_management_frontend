//

import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import { getProducts } from "../../../redux/slices/products";
// shadcn
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// auth
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------

export default function Products() {
  const dispatch = useDispatch();
  const { userRole } = useAuth();

  const [page, setPage] = useState(1);

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ offset: 0, limit: 10 }, userRole));
  }, [dispatch]);

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

  const goToPreviousPage = (currentPage) => {
    dispatch(
      getProducts({ offset: (currentPage - 1) * 10, limit: 10 }, userRole)
    );
    setPage(currentPage);
  };

  const goToNextPage = (currentPage) => {
    dispatch(
      getProducts({ offset: (currentPage - 1) * 10, limit: 10 }, userRole)
    );
    setPage(currentPage);
  };

  return (
    <div className="border-t mb-6">
      <div className="rounded-2xl p-2 pt-6 mt-4">
        <Table className="border rounded-2xl">
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead colSpan={1}>Title</TableHead>

              <TableHead colSpan={1}>Description</TableHead>

              <TableHead colSpan={1}>Category</TableHead>

              <TableHead colSpan={1}>Price</TableHead>

              <TableHead colSpan={1}>Total Quantity</TableHead>

              <TableHead colSpan={1}>Available Quantity</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            <TableBodyContent products={products?.products} />
          </TableBody>
        </Table>
      </div>

      <div className="ml-auto flex justify-end mt-1 mr-3 items-center gap-2 lg:ml-0">
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {`Page ${page} of ${Math.ceil(products.pagination?.totalCount / 10)}`}
        </div>

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

        <Button
          variant="outline"
          className="size-8"
          size="icon"
          disabled={page === Math.ceil(products?.pagination?.totalCount / 10)}
          onClick={() => goToNextPage(page + 1)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
}

const TableBodyContent = (data) => {
  const { products } = data;

  if (!products?.length) {
    return (
      <TableRow>
        <TableCell colSpan={4}>No Products Data Added Yet.</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {products?.map((product, id) => {
        return (
          <TableRow key={`products-${id}`}>
            <TableCell colSpan={1} className="h-24">
              {product?.title ?? "-"}
            </TableCell>

            <TableCell colSpan={1} className="h-24">
              {product?.description ?? "-"}
            </TableCell>

            <TableCell colSpan={1} className="h-24">
              {product?.category ?? "-"}
            </TableCell>

            <TableCell colSpan={1} className="h-24">
              <span className="line-through">{product?.actual_price}</span>
              <span> </span>
              <span className="font-bold text-base">
                {product?.discounted_price}
              </span>{" "}
              EUR
            </TableCell>

            <TableCell colSpan={1} className="h-24">
              {product?.total_quantity ?? "-"}
            </TableCell>

            <TableCell colSpan={1} className="h-24">
              {product?.available_quantity ?? "-"}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
