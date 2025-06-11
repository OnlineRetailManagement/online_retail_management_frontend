//

import React, { useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { userCheckout } from "../../../redux/slices/checkout";
import { getUserAddress, getUserPayment } from "../../../redux/slices/profile";
// paths
import { USER_PATHS } from "../../../routes/paths";

// ----------------------------------------

export default function Carts() {
  const closeRef = useRef(null);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const { isLoading, cart, isUpdateQntSuccess, isDeletionSuccess } =
    useSelector((state) => state.cart);

  const { /*isLoading: isLoadingCheckOut,*/ checkoutResponse } = useSelector(
    (state) => state.checkout
  );

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

  useEffect(() => {
    if (checkoutResponse?.length) {
      dispatch(getCartRecord(user?.user?.id));
    }
  }, [checkoutResponse]);

  const handleQuantityUpdate = (quant, cartId) => {
    const payload = { quantity: quant };

    dispatch(updateCartQuantity(payload, cartId));
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(deleteCartItem(cartId));
  };

  const checkoutSubmit = (selectedAddress, selectedPayment) => {
    const payload = {
      user_id: user?.user?.id,
      address_id: selectedAddress?.id,
      payment_id: selectedPayment?.id,
      checkout_items: cart?.data?.cart_items?.map((data) => ({
        cart_id: data?.id,
        product_id: data?.product?.id,
        quantity: data?.quantity,
        order_status: "Processing",
      })),
    };

    dispatch(userCheckout(payload));

    // close the update address dialogue ...
    if (closeRef.current) {
      closeRef.current.click();
    }
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

        {!isLoading && !cart?.data?.cart_items?.length ? (
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
        <CartSummary
          cartData={cart?.data?.cart_items}
          checkoutSubmit={checkoutSubmit}
          closeRef={closeRef}
        />
      ) : null}
    </>
  );
}

const CartSummary = (data) => {
  const { closeRef } = data;

  const dispatch = useDispatch();
  const { user } = useAuth();

  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedPayment, setSelectedPayment] = useState({});

  const { cartData, checkoutSubmit } = data;

  const { payment, addresses } = useSelector((state) => state.profile);

  const actualPrice = cartData?.reduce(
    (a, b) => a + b?.product?.actual_price * (b?.quantity ? b?.quantity : 1),
    0
  );

  const discountedPrice = cartData?.reduce(
    (a, b) =>
      a + b?.product?.discounted_price * (b?.quantity ? b?.quantity : 1),
    0
  );

  useEffect(() => {
    dispatch(getUserAddress(user?.user?.id));
    dispatch(getUserPayment(user?.user?.id));
  }, [dispatch]);

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit">Pay and Checkout</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select Address and Payment</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 pt-3">
              <div>
                <p>Select Address</p>
                <div className="grid gap-3">
                  {addresses?.map((add) => {
                    return (
                      <Card
                        key={`address-${add.id}`}
                        className={`p-3 cursor-pointer ${
                          selectedAddress.id === add.id ? "bg-gray-300" : ""
                        }`}
                        onClick={() => setSelectedAddress(add)}
                      >
                        <p>
                          {add.address_line1}, {add.address_line2}, {add.city},{" "}
                          {add.zip_code}, {add.country}
                        </p>
                      </Card>
                    );
                  })}
                </div>

                <p className="pt-2">Select Payment</p>
                <div className="grid gap-3">
                  {payment?.map((paym) => {
                    return (
                      <Card
                        key={`payment-${paym.id}`}
                        className={`p-3 gap-0 cursor-pointer ${
                          selectedPayment.id === paym.id ? "bg-gray-300" : ""
                        }`}
                        onClick={() => setSelectedPayment(paym)}
                      >
                        <p>Card no: {paym.card_no}</p>
                        <p>
                          Expiry date:{" "}
                          {new Date(paym.expiry_date).toLocaleDateString()}
                        </p>
                        <p>CVV: {paym.cvv}</p>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  onClick={() =>
                    checkoutSubmit(selectedAddress, selectedPayment)
                  }
                >
                  Save And Proceed
                </Button>
              </div>
            </div>

            <DialogTrigger asChild>
              <button ref={closeRef} className="hidden" />
            </DialogTrigger>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
