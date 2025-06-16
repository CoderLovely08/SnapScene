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
import { useLogin } from "@/hooks/auth/useLogin";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const { adminLoginForm, onSubmit, isSignInPending } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <main className="container flex items-center justify-center h-screen mx-auto px-6 py-4">
        <div className="w-full max-w-md">
          {/* Logo Area */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-white mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Login Portal
            </h1>
          </div>
          {/* Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 ring-1 ring-gray-200">
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
          </div>
        </div>
      </main>
    </div>
  );
}
