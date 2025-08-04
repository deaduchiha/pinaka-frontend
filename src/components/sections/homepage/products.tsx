import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Products = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-jetblack-900">محصولات</h2>

        <Button
          variant={"link"}
          size={"sm"}
          className="gap-2 text-sm text-blue-400"
        >
          <span>مشاهده همه</span>
          <ArrowLeft className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Products;
