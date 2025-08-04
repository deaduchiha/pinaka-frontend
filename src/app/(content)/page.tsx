import Introduce from "@/components/sections/homepage/introduce";
import Products from "@/components/sections/homepage/products";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Introduce />

      <Products />

      {/* Footer */}
      {/* <footer>ساخته شده توسط پیناکا</footer> */}
    </div>
  );
}
