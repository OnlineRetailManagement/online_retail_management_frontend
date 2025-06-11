//

import React, { useEffect, useState } from "react";
// redux
import { getOrder } from "../../../redux/slices/orders";
import { useDispatch, useSelector } from "../../../redux/store";
// useAuth
import useAuth from "../../../hooks/useAuth";
// radix
import { Card, CardContent } from "@/components/ui/card";

// ----------------------------------------

export default function Orders() {
  const dispatch = useDispatch();

  const { user, userRole } = useAuth();

  const [isGetActiveOrders, setIsGetActiveOrders] = useState(true);

  useEffect(() => {
    dispatch(getOrder(user?.user?.id, isGetActiveOrders, userRole));
  }, [dispatch]);

  const { /* isLoading, */ orders } = useSelector((state) => state.orders);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const formatted = date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return formatted;
  };

  console.log(orders);

  return (
    <div className="ml-4 h-screen">
      <div className="flex my-5">
        <p className="font-semibold text-gray-700">Users: Orders</p>
      </div>

      <div className="flex flex-col gap-3">
        {orders?.map((order) => {
          return (
            <Card className="w-full" key={`cart-${order.id}`}>
              <CardContent>
                <div className="flex flex-row gap-2">
                  <div className="basis-3/10">
                    <img
                      src={
                        order?.product?.attachments[0]?.attachment_path ?? null
                      }
                      className="border"
                    />
                  </div>

                  <div className="basis-6/10">
                    <p className="font-semibold">
                      {order?.product?.title ?? ""}
                    </p>
                    <p className="text-sm">
                      {order?.product?.description ?? ""}
                    </p>
                    <p className="text-sm">
                      {order?.product?.delivery_time ?? ""}
                    </p>
                    <p>{order?.product?.discounted_price ?? ""} EUR</p>
                    <p className="text-sm">Quantity: {order?.quantity}</p>
                    <p>
                      You saved{" "}
                      {order?.product?.actual_price -
                        order?.product?.discounted_price}
                      EUR on this order.
                    </p>
                    <p className="text-sm">
                      Ordered on: {formatDate(order?.checkout_date)}
                    </p>

                    {/* TODO: need to add the order status */}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
