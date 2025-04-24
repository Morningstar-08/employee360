import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 ">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">New Here..?</h1>
                <p className="text-balance text-muted-foreground">
                  Signup to your Employee 360 account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="name" placeholder="full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Dropdown for Role Selection */}
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="HR_MANAGER">HR_MANAGER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button
                variant="outline"
                type="submit"
                className="bg-blue-200 w-[60%] ml-17"
              >
                Signup
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log in
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
