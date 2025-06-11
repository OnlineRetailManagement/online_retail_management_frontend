//

import React, { useEffect, useState } from "react";
// shadcn
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// lucid-icon
import { MapPin, Banknote } from "lucide-react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
import { getOrder, updateOrder } from "../../../redux/slices/orders";
// hooks
import useAuth from "../../../hooks/useAuth";

const orderStatus = [
  {
    id: 1,
    name: "Processing",
  },
  {
    id: 2,
    name: "Confirmed",
  },
  {
    id: 3,
    name: "Shipped",
  },
  {
    id: 4,
    name: "In Transit",
  },
  {
    id: 5,
    name: "Out for Delivery",
  },
  {
    id: 6,
    name: "Delivered",
  },
];

// ----------------------------------------

export default function Orders() {
  const dispatch = useDispatch();
  const { user, userRole } = useAuth();

  const [isGetActiveOrders, setIsGetActiveOrders] = useState(true);

  const { /* isLoading, */ isOrderUpdated, orders } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getOrder(user?.user?.id, isGetActiveOrders, userRole));
  }, [dispatch]);

  useEffect(() => {
    if (isOrderUpdated) {
      dispatch(getOrder(user?.user?.id, isGetActiveOrders, userRole));
    }
  }, [isOrderUpdated]);

  const handleOrderStatusChange = (e, orderData) => {
    dispatch(updateOrder({ order_id: orderData?.id, order_status: e }));
  };

  return (
    <div className="ml-4 h-screen">
      <div className="flex my-5">
        <p className="font-semibold text-gray-700">Vendors: Orders</p>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        {orders?.map((ordr) => {
          return (
            <Card key={`vendor-order-${ordr.id}`}>
              <CardContent>
                <div className="flex">
                  <div className="basis-8/10">
                    <p>Product: {ordr?.product?.title}</p>
                    <p>Description: {ordr?.product?.description}</p>
                    <p>Delivery time: {ordr?.product?.delivery_time}</p>
                    <p>Quantity: {ordr?.quantity}</p>

                    <div className="flex gap-2 items-center pt-1">
                      <MapPin size={16} />
                      <p>
                        Delivery Address:{" "}
                        {ordr?.address?.address_line1 +
                          " " +
                          ordr?.address?.address_line2 +
                          ", " +
                          ordr?.address?.zip_code +
                          " " +
                          ordr?.address?.city +
                          ". " +
                          ordr?.address?.country}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center pt-1">
                      <Banknote size={16} />
                      <p>Payment Status: Done</p>
                    </div>
                  </div>

                  <div className="basis-2/10">
                    <div className="grid gap-2">
                      <Label htmlFor="order_status">Order Status</Label>
                      <Select
                        name="order_status"
                        id="order_status"
                        onValueChange={(e) => handleOrderStatusChange(e, ordr)}
                      >
                        <SelectTrigger className="w-full" id="rows-per-page">
                          <SelectValue
                            placeholder={ordr?.order_status ?? "Processing"}
                          />
                        </SelectTrigger>

                        <SelectContent side="top">
                          {orderStatus.map((stat) => (
                            <SelectItem key={stat.id} value={stat.name}>
                              {stat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
