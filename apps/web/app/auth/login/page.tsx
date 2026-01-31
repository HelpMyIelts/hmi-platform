import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@repo/ui/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            Help My IELTS
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src="/logo.png"
            alt="Help My IELTS"
            className="max-w-full max-h-full object-contain opacity-90 transition-opacity hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
