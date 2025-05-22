//

import React, { useState } from "react";
// libs
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
// @shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// routes
import { PATH_AUTH } from "../../routes/paths";
// hooks
import useAuth from "../../hooks/useAuth";

// ----------------------------------------

export default function Register() {
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const elements = new FormData(e.currentTarget);

    const email = elements.get("email");
    const password = elements.get("password");
    const firstName = elements.get("firstName");
    const lastName = elements.get("lastName");

    if (email?.length && password?.length) {
      setIsLoading(true);
      await register(email, password, firstName, lastName);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your details below to register to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="firstName">First Name</Label>
                      </div>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
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
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    {isLoading ? "Please Wait ..." : "Register"}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to={PATH_AUTH.login}
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
