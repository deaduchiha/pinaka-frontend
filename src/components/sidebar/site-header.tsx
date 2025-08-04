import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import { UserIcon } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-20">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="ltr:-ml-1 rtl:-mr-1" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-base font-medium">
          {/* name of Restaurant or Menu */}
          داشبورد مدیریتی
        </h1>

        {/* actions user account */}
        {/* <div className="ltr:ml-auto rtl:mr-auto  flex items-center gap-2">
          <Button variant="ghost" size={"icon"} className="hidden sm:flex">
            <UserIcon className="scale-150" />
          </Button>
        </div> */}
      </div>
    </header>
  );
}
