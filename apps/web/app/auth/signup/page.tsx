import Link from "next/link";

import { SignupForm } from "@repo/ui/components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src="/hmi_logo.png"
            alt="Help My IELTS"
            className="max-w-full max-h-full object-contain opacity-90 transition-opacity hover:opacity-100"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            Help My IELTS
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
