import Navbar from "@/components/core/Navbar";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/auth/useLogin";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const { adminLoginForm, onSubmit, isSignInPending } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-full">
      <Navbar />
      <main className="container flex items-center justify-center h-screen mx-auto px-6 py-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Sign In</h2>
            </div>
            <Form {...adminLoginForm}>
              <form
                onSubmit={adminLoginForm.handleSubmit(onSubmit)}
                className="space-y-3 max-w-full mx-auto"
              >
                <FormField
                  control={adminLoginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@exmaple.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminLoginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="relative">
                        <div className="relative">
                          <Input
                            placeholder="********"
                            type={passwordVisible ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                          >
                            {passwordVisible ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSignInPending}>
                  {isSignInPending ? "Signing in..." : "Sign in"}
                  {isSignInPending && (
                    <LoadingSpinner spinnerColor="text-white" />
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <Separator className="bg-white/20 my-2" />
              <p className="text-white/60">
                Don't have an account?{" "}
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
