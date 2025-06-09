//

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// radix
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// lucid-react
import { Trash2, ArrowRight } from "lucide-react";
// redux
import { useDispatch, useSelector } from "../../../redux/store";
// auth
import useAuth from "../../../hooks/useAuth";
// redux
import {
  deleteCartItem,
  getCartRecord,
  updateCartQuantity,
} from "../../../redux/slices/cart";
// paths
import { USER_PATHS } from "../../../routes/paths";

// ----------------------------------------

export default function Carts() {
  const dispatch = useDispatch();

  const { user } = useAuth();

  const { /* isLoading,*/ cart, isUpdateQntSuccess, isDeletionSuccess } =
    useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartRecord(user?.user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (isUpdateQntSuccess) {
      dispatch(getCartRecord(user?.user?.id));
    }
  }, [isUpdateQntSuccess]);

  useEffect(() => {
    if (isDeletionSuccess) {
      dispatch(getCartRecord(user?.user?.id));
    }
  }, [isDeletionSuccess]);

  const handleQuantityUpdate = (quant, cartId) => {
    const payload = { quantity: quant };

    dispatch(updateCartQuantity(payload, cartId));
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(deleteCartItem(cartId));
  };

  return (
    <>
      <div className="ml-4 h-screen">
        <div className="flex my-5">
          <p className="font-semibold text-gray-700">Users: Cart</p>
        </div>

        <div className="flex flex-col gap-2">
          {cart?.data?.cart_items?.map((crt) => {
            return (
              <Card className="w-full" key={`cart-${crt.id}`}>
                <CardContent>
                  <div className="flex flex-row gap-2">
                    <div className="basis-3/10">
                      <img
                        src={
                          crt?.product?.attachments[0]?.attachment_path ?? null
                        }
                        className="border"
                      />
                    </div>

                    <div className="basis-6/10">
                      <p>{crt?.product?.title ?? ""}</p>
                      <p>{crt?.product?.description ?? ""}</p>
                      <p>{crt?.product?.delivery_time ?? ""}</p>
                      <p>{crt?.product?.discounted_price ?? ""} EUR</p>

                      <div className="grid gap-1 mt-3">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Select
                          name="quantity"
                          id="quantity"
                          onValueChange={(qty) =>
                            handleQuantityUpdate(qty, crt?.id)
                          }
                        >
                          <SelectTrigger id="rows-per-page">
                            <SelectValue placeholder={crt?.quantity} />
                          </SelectTrigger>

                          <SelectContent side="top">
                            {[1, 2, 3, 4, 5].map((count) => (
                              <SelectItem
                                key={`count-${crt.id}-${count}`}
                                value={count}
                              >
                                {count}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="basis-1/10">
                      <Button onClick={() => handleDeleteCartItem(crt.id)}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!cart?.data?.cart_items?.length ? (
          <div className="flex justify-center text-center">
            <div>
              <p className="my-6">Add something to cart ...</p>

              <Button className="flex items-center">
                <Link to={USER_PATHS.products} className="flex items-center">
                  Go to Products page &nbsp; &nbsp; <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {cart?.data?.cart_items?.length ? (
        <CartSummary cartData={cart?.data?.cart_items} />
      ) : null}
    </>
  );
}

const CartSummary = (data) => {
  const { cartData } = data;

  const actualPrice = cartData?.reduce(
    (a, b) => a + b?.product?.actual_price,
    0
  );

  const discountedPrice = cartData?.reduce(
    (a, b) => a + b?.product?.discounted_price,
    0
  );

  return (
    <div className="sticky bottom-4 border rounded-md p-3 bg-gray-200">
      <p className="font-semibold text-sm mb-2">Checkout details</p>

      <div className="flex">
        <div className="flex basis-6/8">
          <p className="text-gray-900 text-sm">
            {cartData?.length && cartData[0]?.product?.delivery_time}
          </p>
        </div>

        <div className="basis-2/8 flex flex-col items-end">
          <p className="text-gray-600 text-sm">
            Actual price: &nbsp;
            <span className="line-through">{actualPrice} EUR</span>
          </p>

          <p className="text-gray-900 text-sm">
            You saved: {actualPrice - discountedPrice} EUR 🎁
          </p>

          <p className="text-gray-900 font-semibold text-md">
            You pay: {discountedPrice} EUR
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <Button>Pay and Checkout</Button>
      </div>
    </div>
  );
};
