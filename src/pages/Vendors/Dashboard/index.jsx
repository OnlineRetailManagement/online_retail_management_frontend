//

import React, { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import { getAnalytics } from "../../../redux/slices/analytics";
// auth
import useAuth from "../../../hooks/useAuth";
// shadcn
import { Card, CardContent } from "@/components/ui/card";

// ----------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();
  const { userRole } = useAuth();

  const { analytics } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getAnalytics(userRole));
  }, [dispatch]);

  return (
    <div className="ml-4 h-screen">
      <div className="flex my-5">
        <p className="font-semibold text-gray-700">Admin: Dashboard</p>
      </div>

      <div className="flex flex-col gap-4 pb-8">
        {/* User Counts ... */}
        <p className="pb-3 font-semibold text-gray-500">Customers Analytics</p>
        <div className="flex gap-6 pb-3">
          <Card>
            <CardContent>
              <p>Total Customers</p>
              <p className="font-semibold">{analytics?.customer_count ?? 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics ... */}
        <p className="pb-3 font-semibold text-gray-500">Revenue Analytics</p>

        <div className="flex gap-6 pb-3">
          <Card>
            <CardContent>
              <p>Total Revenue</p>
              <p className="font-semibold">{analytics?.total_revenue ?? 0} €</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p>Total Revenue After Discount</p>
              <p className="font-semibold">
                {analytics?.total_revenue_discounted_vendor ?? 0} €
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order analytics ... */}
        <p className="pb-3 font-semibold text-gray-500">Order Analytics</p>
        <div className="grid grid-cols-3 gap-4">
          <Card className="grid col-span-3 gap-2">
            <CardContent>
              <p>Total Orders</p>
              <p className="font-semibold">
                {analytics?.total_order_count ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>Under Processing Orders</p>
              <p className="font-semibold">
                {analytics?.count_processing ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>Confirmed Orders</p>
              <p className="font-semibold">{analytics?.count_confirmed ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>Shipped Orders</p>
              <p className="font-semibold">{analytics?.count_shipped ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>In Transist Orders</p>
              <p className="font-semibold">
                {analytics?.count_in_transit ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>Out for Delivery Orders</p>
              <p className="font-semibold">
                {analytics?.count_out_for_delivery ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card className="grid gap-2">
            <CardContent>
              <p>Delivered Orders</p>
              <p className="font-semibold">
                {analytics?.count_in_delivered ?? 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cart analytics ... */}
        <p className="pb-3 font-semibold text-gray-500">
          Shopping Cart Analytics
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Card className="grid gap-2">
            <CardContent>
              <p>Products under Cart</p>
              <p className="font-semibold">{analytics?.count_cart ?? 0}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
