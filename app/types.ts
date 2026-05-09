export type Category = "cars" | "motos" | "bicycles" | "trotinette";

export interface Product {
  id: number;
  category: Category;
  name: string;
  reference?: string;
  ageRange: string;
  price?: number;
  promotion?: boolean;
  image?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  video?: string;
  dimensions?: string;
  description: string;
  badge?: string;
}
