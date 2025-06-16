import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/utils/app.constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { useRegister } from "@/hooks/auth/useLogin";
import Navbar from "@/components/core/Navbar";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const { userRegisterForm, onSubmit, isRegisterPending } = useRegister();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="container flex items-center justify-center h-screen mx-auto px-6 py-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Register</h2>
            </div>
            <Form {...userRegisterForm}>
              <form
                onSubmit={userRegisterForm.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={userRegisterForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Wick" type="text" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={userRegisterForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@wick.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={userRegisterForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
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

                <Button type="submit" disabled={isRegisterPending}>
                  {isRegisterPending ? "Signing up..." : "Register"}
                  {isRegisterPending && (
                    <LoadingSpinner spinnerColor="text-white" />
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center">
              <Separator className="bg-white/20 my-2" />
              <p className="text-white/60">
                Already have an account?{" "}
                <Link to={routes.AUTH.LOGIN}>
                  <button className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign in
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
