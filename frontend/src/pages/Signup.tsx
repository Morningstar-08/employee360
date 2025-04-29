import { SignupForm } from "@/components/signup-form";
import { AnimatedBackground } from "@/components/AnimatedBackground"; // ✅ Import the background

export default function Signup() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
      <AnimatedBackground />
      <div className="z-10 w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
