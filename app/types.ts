export type Category = "cars" | "motos" | "bicycles" | "trotinette";

export interface Product {
  id: number;
  category: Category;
  name: string;
  ageRange: string;
  price?: number;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  video?: string;
  dimensions?: string;
  description: string;
  badge?: string;
}
