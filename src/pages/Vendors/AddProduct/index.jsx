//

import React from "react";
// shadcn
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// auth
import useAuth from "../../../hooks/useAuth";

// ----------------------------------------

const producCategories = [
  {
    id: 0,
    name: "Select Category",
  },
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Education Stationary",
  },
  {
    id: 3,
    name: "Kitchen Appliances",
  },
  {
    id: 4,
    name: "Groceries",
  },
  {
    id: 5,
    name: "Craft",
  },
  {
    id: 6,
    name: "Clothing",
  },
  {
    id: 7,
    name: "Decoration",
  },
  {
    id: 8,
    name: "Cosmetics",
  },
];

export default function index() {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const elements = new FormData(e.currentTarget);

    const payload = {
      title: elements.get("title"),
      title_description: elements.get("title_description"),
      category: elements.get("category"),
      actual_price: elements.get("actual_price"),
      discounted_price: elements.get("discounted_price"),
      total_quantity: elements.get("total_quantity"),
      available_quantity: elements.get("available_quantity"),
      weight: elements.get("weight"),
      dimensions: elements.get("dimensions"),
      sold_quantity: elements.get("sold_quantity"),
      delivery_time: elements.get("delivery_time"),
      owned_by: user?.user?.id,
      attachment_ids: [],
    };

    console.log(payload);
  };

  return (
    <div className="border-t">
      <div className="rounded-2xl p-2 px-4 pt-6">
        <div>
          <p className="font-bold">Add Product</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mt-6">
            {/* title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                type="title"
                name="title"
                placeholder="Add the Title of Product"
                required
                defaultValue="Samsung Mobile"
              />
            </div>

            {/* title_description */}
            <div className="grid gap-2">
              <Label htmlFor="title_description">Product Description</Label>
              <Input
                id="title_description"
                type="title_description"
                name="title_description"
                placeholder="Add the Description of Product"
                required
              />
            </div>

            {/* category */}
            <div className="grid gap-2">
              <Label htmlFor="category">Product Category</Label>
              <Select name="category" id="category">
                <SelectTrigger className="w-70" id="rows-per-page">
                  <SelectValue placeholder={producCategories[0].name} />
                </SelectTrigger>

                <SelectContent side="top">
                  {producCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* actual_price and discounted_price */}
            <div className="grid grid-flow-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="actual_price">Actual Price</Label>
                <Input
                  id="actual_price"
                  type="number"
                  name="actual_price"
                  placeholder="Actual Price in EUR"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="discounted_price">Discounted Price</Label>
                <Input
                  id="discounted_price"
                  type="number"
                  name="discounted_price"
                  placeholder="Discounted Price in EUR"
                  required
                />
              </div>
            </div>

            {/* total_quantity and available_quantity */}
            <div className="grid grid-flow-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="total_quantity">Total Quantity</Label>
                <Input
                  id="total_quantity"
                  type="number"
                  name="total_quantity"
                  placeholder="Number of Total Quantity"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="available_quantity">Available Quantity</Label>
                <Input
                  id="available_quantity"
                  type="number"
                  name="available_quantity"
                  placeholder="Number of Available Quantity"
                  required
                />
              </div>
            </div>

            {/* weight and dimention */}
            <div className="grid grid-flow-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  name="weight"
                  placeholder="Add Weight of Product in grams"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dimensions">Dimension</Label>
                <Input
                  id="dimensions"
                  type="string"
                  name="dimensions"
                  placeholder="Dimension of Product"
                  required
                />
              </div>
            </div>

            {/* sold quantity */}
            <div className="grid gap-2">
              <Label htmlFor="weight">Sold Quantity</Label>
              <Input
                id="sold_quantity"
                type="number"
                name="sold_quantity"
                placeholder="Number of Sold Quantity"
                required
              />
            </div>

            {/* estimated delivery time */}
            <div className="grid gap-2">
              <Label htmlFor="delivery_time">Delivery Time</Label>
              <Input
                id="delivery_time"
                name="delivery_time"
                placeholder="Estimated Delivery Time"
                required
              />
            </div>

            <div className="grid gap-2">
              <Button type="submit" className="w-full" disabled={false}>
                {false && <Loader2 className="animate-spin" />}
                {false ? "Please Wait ..." : "Create Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
