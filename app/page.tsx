import productsData from "@/data/products.json";
import CatalogApp from "./components/CatalogApp";
import { Product } from "./types";

const products = productsData as Product[];

export default function Home() {
  return <CatalogApp products={products} />;
}
