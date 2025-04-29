import { LoginForm } from "@/components/login-form";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function LoginPage() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AnimatedBackground />
        <LoginForm />
      </div>
    </div>
  );
}
