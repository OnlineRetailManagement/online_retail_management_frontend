//

import React, { useEffect } from "react";
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
import { Link } from "react-router-dom";
import { VENDOR_PATHS } from "../../../routes/paths";
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------

export default function Products() {
  const dispatch = useDispatch();
  const { user, userRole } = useAuth();

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getProducts({ offset: 0, limit: 10, user_id: user?.user?.id }, userRole)
    );
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

  return (
    <div className="border-t">
      <div className="rounded-2xl p-2 pt-6 mt-2">
        <div className="flex justify-end mb-4">
          <Button asChild>
            <Link to={VENDOR_PATHS.addProducts}>Add Products</Link>
          </Button>
        </div>

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
