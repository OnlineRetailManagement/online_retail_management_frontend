//

import React, { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import { getUsers } from "../../../redux/slices/users";
// @icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";

// ----------------------------------------

export default function Users() {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { isLoading, users } = useSelector((state) => state.users);

  useEffect(() => {
    getUsersList(offset, limit);
  }, [dispatch]);

  // console.log(users);

  const getUsersList = (offs, limi) => {
    const payload = { offset: offs, limit: limi };

    dispatch(getUsers(payload));
  };

  // TODO: adding pagination is pending here ...
  const handlePageLimit = (value) => {
    setLimit(value);
    getUsersList(offset, value);
  };

  const goToPreviousPage = () => {
    if (offset - limit >= 0) setOffset(offset - limit);
    else setOffset(0);
    // API call

    getUsersList(offset - limit >= 0 ? offset - limit : 0, limit);
  };

  const goToNextPage = () => {
    if (offset + limit >= 0) setOffset(offset + limit);
    else setOffset(0);
    // API call

    getUsersList(offset + limit >= 0 ? offset + limit : 0, limit);
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
    <div className="border-t">
      <div className="rounded-2xl p-2 pt-6 mt-4">
        <Table className="border rounded-2xl">
          <TableHeader className="sticky top-0 z-10 bg-muted">
            <TableRow>
              <TableHead colSpan={1}>First Name</TableHead>

              <TableHead colSpan={1}>Last Name</TableHead>

              <TableHead colSpan={1}>Email</TableHead>

              <TableHead colSpan={1}>Location</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {users?.map((user, id) => {
              return (
                <TableRow key={`user-${id}`}>
                  <TableCell colSpan={1} className="h-24 text-center">
                    {user?.firstName && "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {user?.lastName && "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {user?.email ?? "-"}
                  </TableCell>

                  <TableCell colSpan={1} className="h-24 text-center">
                    {user?.location ?? "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 pt-3">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex"></div>

          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>

              <Select
                value={limit}
                onValueChange={(value) => handlePageLimit(Number(value))}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>

                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-fit items-center justify-center text-sm font-medium">
              {/* Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} */}
              Page 1 of 3
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                // disabled={!table.getCanPreviousPage()}
                onClick={() => goToPreviousPage()}
                disabled={false}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>

              <Button
                variant="outline"
                className="size-8"
                size="icon"
                // disabled={!table.getCanNextPage()}
                onClick={() => goToNextPage()}
                disabled={false}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
