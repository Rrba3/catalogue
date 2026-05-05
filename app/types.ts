export type Category = "cars" | "motos" | "bicycles" | "trotinette";

export interface Product {
  id: number;
  category: Category;
  name: string;
  ageRange: string;
  image: string;
  video: string;
  dimensions: string;
  description: string;
  badge?: string;
}
