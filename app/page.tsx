import products from "@/data/products.json";
import CatalogApp from "./components/CatalogApp";

export default function Home() {
  return <CatalogApp products={products} />;
}
