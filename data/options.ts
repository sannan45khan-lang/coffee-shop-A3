import { Option } from "./types";

// Customiser choices. extraPrice is added to the drink's base price.

export const sizes: Option[] = [
  { name: "Small", extraPrice: 0 },
  { name: "Medium", extraPrice: 100 },
  { name: "Large", extraPrice: 200 },
];

export const milks: Option[] = [
  { name: "Whole Milk", extraPrice: 0 },
  { name: "Skimmed Milk", extraPrice: 0 },
  { name: "Oat Milk", extraPrice: 80 },
  { name: "Almond Milk", extraPrice: 80 },
  { name: "Soy Milk", extraPrice: 60 },
  { name: "No Milk", extraPrice: 0 },
];

export const extras: Option[] = [
  { name: "Extra Shot", extraPrice: 90 },
  { name: "Vanilla Syrup", extraPrice: 60 },
  { name: "Caramel Syrup", extraPrice: 60 },
  { name: "Whipped Cream", extraPrice: 50 },
  { name: "Chocolate Drizzle", extraPrice: 50 },
];
