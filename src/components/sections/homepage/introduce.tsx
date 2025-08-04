import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

const Introduce = () => {
  return (
    <section className=" flex items-center min-h-[60svh] border-b border-jetblack-100 bg-platinum-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-jetblack-900 mb-6">
            به پیناکا خوش آمدید
          </h1>
          <p className="text-xl text-jetblack-400 mb-8 max-w-3xl mx-auto">
            با استفاده از پیناکا می توانید به راحتی محصولات خود را ثبت کنید و به
            بازار عرضه کنید.
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Button
              className="border-jetblack-100 border"
              variant={"secondary"}
              size="lg"
              asChild
            >
              <Link href={"https://github.com/deaduchiha/pinaka-frontend"}>
                <Github />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduce;
