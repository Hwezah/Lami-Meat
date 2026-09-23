import raw from "@/data/products.json";

export type Size = "500g" | "1kg";
export type Product = {
  id: string;
  num: string;
  kind: "Smoked" | "Fresh";
  name: string;
  p500: number;
  p1k: number;
  img: string;
  desc: string;
  specs: [string, string][];
};

export const products = raw as Product[];
export const SIZES: Size[] = ["500g", "1kg"];

export const priceOf = (p: Product, size: Size) => (size === "1kg" ? p.p1k : p.p500);
export const productByName = (name: string) => products.find((p) => p.name === name);
