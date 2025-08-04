"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "شماره تلفن الزامی است")
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("ورود موفقیت‌آمیز بود");

      // Redirect based on user role
      const user = useAuthStore.getState().user;
      if (user) {
        switch (user.role) {
          case "admin":
            router.push("/admin");
            break;
          case "manager":
            router.push("/manager");
            break;
          case "customer":
            router.push("/customer");
            break;
          default:
            router.push("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-platinum-100 rounded-lg shadow-sm p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ورود به حساب کاربری
        </h2>
        <p className="text-gray-600">اطلاعات خود را وارد کنید</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            شماره تلفن
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="0990***0123"
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            رمز عبور
          </label>
          <div className="relative">
            <Input
              id="password"
              dir="ltr"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور خود را وارد کنید"
              {...register("password")}
              className={cn(
                "placeholder:text-right ",
                errors.password ? "border-red-500 pr-10" : "pr-10"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            فراموشی رمز عبور؟
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              در حال ورود...
            </>
          ) : (
            "ورود"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
