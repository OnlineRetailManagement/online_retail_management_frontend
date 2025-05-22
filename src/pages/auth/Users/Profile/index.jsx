//

import React from "react";
//
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ----------------------------------------

export default function Profile() {
  const handleChange = (e) => {
    //
  };

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl pt-8">
        <div className="flex flex-col gap-6 border p-6 rounded-2xl">
          <div className="flex flex-row gap-3">
            <Avatar>
              <AvatarFallback>
                <p className="p-2">NU</p>
              </AvatarFallback>
            </Avatar>

            <span className="inline-block align-middle leading-6">
              {"User Name"}
            </span>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="firstName">First Name</Label>
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={""}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="lastName">Last Name</Label>
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={""}
              onChange={handleChange}
            />
          </div>

          <div>
            <p>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
