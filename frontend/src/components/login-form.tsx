import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "@/services/apiUser";
import { Card, CardContent } from "./ui/card";

export function LoginForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    //login api
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (role === "HR_MANAGER") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  console.log(error);
  return (
    <div
      className={cn(
        "shadow-[0_0_10px_rgba(0,0,0,0.35)] border-none flex flex-col rounded-2xl gap-6",
        className
      )}
    >
      <Card className="border-none overflow-hidden bg-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Employee 360 account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={({ target }) => {
                    setPassword(target.value);
                  }}
                />
              </div>
              <Button type="submit" className=" bg-blue-200 w-[60%] ml-17">
                Login
              </Button>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:flex items-center justify-center ">
            <img
              src="/new.png"
              alt="Image"
              className="w-[90%] object-cover rounded-xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
