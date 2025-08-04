"use client";
import { useAuthStore } from "@/lib/store/auth-store";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    return (
      <div className="text-center text-2xl font-bold">
        شما دسترسی به این صفحه را ندارید
      </div>
    );
  }

  return children;
};

export default AdminLayout;
