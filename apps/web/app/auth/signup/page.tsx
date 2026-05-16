'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSignup } from '../../../query/auth.query';
import { paths } from '../../../routes/paths';
import { GuestGuard } from '../../../guards/GuestGuard';
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Separator } from "@repo/ui/components/separator";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";

export default function SignupPage() {
  const signupMutation = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    signupMutation.mutate({ email, password, name });
  };

  return (
    <GuestGuard>
      <div className="min-h-screen flex flex-col md:flex-row relative">
        {/* Logo at the VERY top-left corner */}
        <div className="absolute top-4 left-4 z-50">
          <div className="relative w-72 h-24">
            <Image 
              src="/helpmyielts.png" 
              alt="HelpMyIELTS Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        {/* Left Side: Branding/Illustration */}
        <div className="w-full md:w-1/2 bg-white border-r border-gray-200 flex flex-col p-6 sm:p-10 relative">
          {/* Illustration in the center */}
          <div className="hidden md:flex flex-1 items-center justify-center mt-12">
            <div className="relative w-full max-w-[520px] aspect-[600/390]">
               <Image 
                src="/assets/images/illustrations/3.webp" 
                alt="Auth Illustration" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="hidden md:block h-20" />
        </div>

        {/* Right Side: Signup Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-white">
          <div className="w-full max-w-[35rem] flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
              <div className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link href={paths.auth.login} className="text-blue-600 hover:underline ml-1">
                  Log in
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full h-12 text-gray-700 font-medium border-gray-300">
                <div className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   Sign up with Google
                </div>
              </Button>
              <Button variant="outline" className="w-full h-12 text-gray-700 font-medium border-gray-300">
                 <div className="flex items-center gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                   Sign up with Facebook
                </div>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or use email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Enter your full name"
                  className="h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="Enter your email"
                  className="h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="Create a password"
                  className="h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>

            <div className="flex justify-center mt-4">
              <Link href="#!" className="text-sm text-blue-600 hover:underline">
                Trouble signing in?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
