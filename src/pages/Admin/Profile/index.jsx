//

import React from "react";
import { toast } from "sonner";
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
// redux
import { useDispatch } from "../../../redux/store";
import { updateProfile } from "../../../redux/slices/profile";

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
  const dispatch = useDispatch();
  const { user } = useAuth();

  // TODO: integrate get profile api and show it here
  if (false) {
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

  return (
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
        <div className="rounded-2xl p-2 mt-4">
          <p className="font-bold">Manage Address</p>
        </div>
      </div>
    </div>
  );
}
