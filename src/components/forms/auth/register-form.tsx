"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد"),
    phone: z
      .string()
      .min(1, "شماره تلفن الزامی است")
      .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "رمز عبور باید شامل حروف بزرگ، کوچک و اعداد باشد"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerAction } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerAction({
        name: data.name,
        phone: data.phone,
        password: data.password,
      });
      toast.success("ثبت نام موفقیت‌آمیز بود");
      // Redirect will be handled by the auth store
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ثبت نام</h2>
        <p className="text-gray-600">حساب کاربری جدید ایجاد کنید</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            نام و نام خانوادگی
          </label>
          <Input
            id="name"
            type="text"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
            placeholder="09123456789"
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
              dir="ltr"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور خود را وارد کنید"
              {...register("password")}
              className={cn(
                "placeholder:text-right",
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            تکرار رمز عبور
          </label>
          <div className="relative">
            <Input
              dir="ltr"
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="رمز عبور را تکرار کنید"
              {...register("confirmPassword")}
              className={cn(
                "placeholder:text-right",
                errors.password ? "border-red-500 pr-10" : "pr-10"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              در حال ثبت نام...
            </>
          ) : (
            "ثبت نام"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          قبلاً حساب کاربری دارید؟{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}
