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

// ----------------------------------------

export default function Products() {
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    //
    dispatch(getProducts({ offset: 0, limit: 10 }));
  }, [dispatch]);

  console.log(isLoading, products);

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
      <div className="rounded-2xl p-2 pt-6 mt-4">
        <Table className="border rounded-2xl">
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead colSpan={1}>Product</TableHead>

              <TableHead colSpan={1}>Title</TableHead>

              <TableHead colSpan={1}>Description</TableHead>

              <TableHead colSpan={1}>Order</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {products?.map((products, id) => {
              return (
                <TableRow key={`products-${id}`}>
                  <TableCell colSpan={1} className="h-24 text-center">
                    {products?.firstName && "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {products?.lastName && "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {products?.email ?? "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {products?.location ?? "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
