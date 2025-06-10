//

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Trash2, SquarePen } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// auth
import useAuth from "../../hooks/useAuth";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddress,
  updateProfile,
  updateUserAddress,
} from "../../redux/slices/profile";

// ----------------------------------------

const genderRole = [
  {
    id: 1,
    name: "Male",
  },
  {
    id: 2,
    name: "Female",
  },
  {
    id: 3,
    name: "Prefer not to say",
  },
];

export default function Profile() {
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [editAddressData, setEditAddressData] = useState(null);

  const {
    // isLoadingAdd,
    // addError,
    addresses,
    isAddedNewAddress,
    isDeletedAddress,
    isAddressUpdated,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserAddress(user?.user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (isAddedNewAddress) {
      dispatch(getUserAddress(user?.user?.id));
    }
  }, [isAddedNewAddress]);

  useEffect(() => {
    if (isAddressUpdated) {
      dispatch(getUserAddress(user?.user?.id));
    }
  }, [isAddressUpdated]);

  useEffect(() => {
    if (isDeletedAddress) {
      dispatch(getUserAddress(user?.user?.id));
    }
  }, [isDeletedAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const elements = new FormData(e.currentTarget);

    const { password: _, userData } = user?.user;

    const payload = {
      ...userData,
      firstName: elements.get("first_name"),
      lastName: elements.get("last_name"),
      email: elements.get("email"),
      userLanguage: elements.get("language"),
      location: elements.get("location"),
      age: elements.get("age"),
      dateOfBirth: elements.get("date_of_birth"),
      gender: elements.get("gender"),
    };

    try {
      dispatch(updateProfile(payload));

      toast.success("Profile updated successfully ...!");
    } catch (error) {
      toast.success("Oops, error while updating profile ...!");
    }
  };

  const handleNewAddressSubmit = (e) => {
    e.preventDefault();

    const elements = new FormData(e.currentTarget);

    const payload = {
      address_line1: elements.get("address_line1"),
      address_line2: elements.get("address_line2"),
      city: elements.get("city"),
      zip_code: Number(elements.get("zip_code")),
      country: elements.get("country"),
      delivery_email: elements.get("delivery_email"),
      description: elements.get("description"),
      user_id: user?.user?.id,
    };

    dispatch(addUserAddress(payload));

    // close the dialogue ...
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteUserAddress(addressId));
  };

  const handleUpdateAddress = (e, selectedRec) => {
    e.preventDefault();

    const elements = new FormData(e.currentTarget);

    const payload = {
      address_line1: elements.get("address_line1"),
      address_line2: elements.get("address_line2"),
      city: elements.get("city"),
      zip_code: Number(elements.get("zip_code")),
      country: elements.get("country"),
      delivery_email: elements.get("delivery_email"),
      description: elements.get("description"),
      user_id: user?.user?.id,
    };

    dispatch(updateUserAddress(payload, selectedRec?.id));

    // close the update address dialogue ...
    if (closeRef.current) {
      closeRef.current.click();
    }
  };

  return (
    <>
      <div>
        <div className="border-t p-2">
          <div className="rounded-2xl p-2 mt-4">
            <p className="font-bold">Profile Section</p>
          </div>

          {/* image section */}
          <div className="flex p-4">
            <div className="flex flex-col items-center gap-2">
              <img
                src="https://i.pravatar.cc/150?img=8"
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-1 border-gray-300"
              />
              <p className="text-sm font-medium text-gray-700">
                {user?.firstName ?? "" + " " + user?.lastName ?? ""}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 mt-6">
              {/* first_name and last_name */}
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    required
                    placeholder="Add your first name here"
                    defaultValue={user?.user?.firstName}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="title">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    required
                    placeholder="Add your first name here"
                    defaultValue={user?.user?.lastName}
                  />
                </div>
              </div>

              {/* email and language */}
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    required
                    defaultValue={user?.user?.email}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    required
                    placeholder="Add your prefered language"
                    defaultValue={user?.user?.userLanguage}
                  />
                </div>
              </div>

              {/* location and age */}
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    required
                    placeholder="Add your location here"
                    defaultValue={user?.user?.location}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    required
                    placeholder="Add your age"
                    defaultValue={user?.user?.age}
                  />
                </div>
              </div>

              {/* dob and gender */}
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    required
                    // defaultValue={user?.user?.location}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" id="gender">
                    <SelectTrigger className="w-full" id="rows-per-page">
                      <SelectValue
                      // placeholder={producCategories[0].name}
                      />
                    </SelectTrigger>

                    <SelectContent side="top">
                      {genderRole.map((gender) => (
                        <SelectItem key={gender.id} value={gender.name}>
                          {gender.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 mt-2">
                <Button type="submit" className="w-fit" disabled={false}>
                  {false && <Loader2 className="animate-spin" />}
                  {false ? "Please Wait ..." : "Update Profile"}
                </Button>
              </div>
            </div>
          </form>

          {/* address */}
          <div className="flex justify-between rounded-2xl my-5 pt-2">
            <p className="font-bold">Manage Address</p>

            <AddNewAddress
              handleNewAddressSubmit={handleNewAddressSubmit}
              closeRef={closeRef}
            />
          </div>

          <div className="flex flex-col gap-3">
            {addresses?.map((add) => {
              return (
                <Card className="w-full" key={`cart-${add.id}`}>
                  <CardContent>
                    <div className="flex">
                      <div className="basis-8/10">
                        <p>Address Line 01: {add.address_line1}</p>
                        <p>Address Line 02: {add.address_line2}</p>
                        <p>Zip Code: {add.zip_code}</p>
                        <p>City: {add.city}</p>
                        <p>Country: {add.country}</p>
                        <p>Delivery Email: {add.delivery_email}</p>
                        <p>Other Note: {add.description}</p>
                      </div>

                      <div className="basis-2/10">
                        <div className="flex gap-2">
                          {/* edit dialogue ... */}
                          <EditAddressButton
                            selectedAddData={add}
                            editAddressData={editAddressData}
                            setEditAddressData={setEditAddressData}
                            handleUpdateAddress={handleUpdateAddress}
                            closeRef={closeRef}
                          />

                          {/* delete address button ... */}
                          <Button onClick={() => handleDeleteAddress(add.id)}>
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const AddNewAddress = (data) => {
  const { handleNewAddressSubmit, closeRef } = data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">+ Add new address</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleNewAddressSubmit}>
          <div className="grid gap-4 pt-3">
            <div className="grid gap-1">
              <Label htmlFor="title">Street Line 01</Label>
              <Input
                id="address_line1"
                name="address_line1"
                required
                placeholder="Street Line 01"
                defaultValue={data?.address_line1}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="title">Street Line 02</Label>
              <Input
                id="address_line2"
                name="address_line2"
                required
                placeholder="Street Line 02"
                defaultValue={data?.address_line2}
              />
            </div>

            <div className="grid gap-1">
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    placeholder="Your City"
                    defaultValue={data?.city}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="zip_code">Zip Code</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    required
                    placeholder="Zip Code"
                    defaultValue={data?.zip_code}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    placeholder="Your Country"
                    defaultValue={data?.country}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="delivery_email">Delivery Email</Label>
              <Input
                id="delivery_email"
                name="delivery_email"
                required
                placeholder="Delivery Email"
                defaultValue={data?.delivery_email}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="description">Other Description</Label>
              <Input
                id="description"
                name="description"
                required
                placeholder="Other Description"
                defaultValue={data?.description}
              />
            </div>

            <div>
              <Button type="submit">Save Address</Button>
            </div>
          </div>

          <DialogTrigger asChild>
            <button ref={closeRef} className="hidden" />
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditAddressButton = (data) => {
  const {
    selectedAddData,
    editAddressData,
    setEditAddressData,
    handleUpdateAddress,
    closeRef,
  } = data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setEditAddressData(selectedAddData)}>
          <SquarePen />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => handleUpdateAddress(e, selectedAddData)}>
          <div className="grid gap-4 pt-3">
            <div className="grid gap-1">
              <Label htmlFor="title">Street Line 01</Label>
              <Input
                id="address_line1"
                name="address_line1"
                required
                placeholder="Street Line 01"
                defaultValue={editAddressData?.address_line1}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="title">Street Line 02</Label>
              <Input
                id="address_line2"
                name="address_line2"
                required
                placeholder="Street Line 02"
                defaultValue={editAddressData?.address_line2}
              />
            </div>

            <div className="grid gap-1">
              <div className="grid grid-flow-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    placeholder="Your City"
                    defaultValue={editAddressData?.city}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="zip_code">Zip Code</Label>
                  <Input
                    id="zip_code"
                    name="zip_code"
                    required
                    placeholder="Zip Code"
                    defaultValue={editAddressData?.zip_code}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    placeholder="Your Country"
                    defaultValue={editAddressData?.country}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="delivery_email">Delivery Email</Label>
              <Input
                id="delivery_email"
                name="delivery_email"
                required
                placeholder="Delivery Email"
                defaultValue={editAddressData?.delivery_email}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="description">Other Description</Label>
              <Input
                id="description"
                name="description"
                required
                placeholder="Other Description"
                defaultValue={editAddressData?.description}
              />
            </div>

            <div>
              <Button type="submit">Save Address</Button>
            </div>
          </div>

          <DialogTrigger asChild>
            <button ref={closeRef} className="hidden" />
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  );
};
