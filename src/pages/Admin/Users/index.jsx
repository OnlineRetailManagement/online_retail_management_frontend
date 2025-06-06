//

import React, { useEffect, useState } from "react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import { getUsers } from "../../../redux/slices/users";
// @icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
// auth
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------

export default function Users() {
  const dispatch = useDispatch();
  const { userRole } = useAuth();

  const [page, setPage] = useState(1);

  const { isLoading, users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers({ offset: 0, limit: 10 }, userRole));
  }, [dispatch]);

  const goToPreviousPage = (currentPage) => {
    dispatch(getUsers({ offset: (currentPage - 1) * 10, limit: 10 }, userRole));
    setPage(currentPage);
  };

  const goToNextPage = (currentPage) => {
    dispatch(getUsers({ offset: (currentPage - 1) * 10, limit: 10 }, userRole));
    setPage(currentPage);
  };

  console.log(users);

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
            {users?.users?.map((user, id) => {
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

        <div className="ml-auto flex justify-end mt-2 mr-3 items-center gap-2 lg:ml-0">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            {`Page ${page} of ${Math.ceil(users.pagination?.totalCount / 10)}`}
          </div>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={page === Math.floor(users?.pagination?.totalCount / 10)}
            onClick={() => goToPreviousPage(page - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>

          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={page === Math.ceil(users?.pagination?.totalCount / 10)}
            onClick={() => goToNextPage(page + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
