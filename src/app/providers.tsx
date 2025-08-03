"use client";
import { ReactNode } from "react";
import { queryClient } from "@/lib/hooks/use-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
