// TypeScript types for every kind of record in the app.

export type Category = "Hot Coffee" | "Iced Coffee" | "Tea" | "Blended" | "Chocolate";

// One drink on the menu (our main entity).
export interface Drink {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number; // base price in Rs for a Small cup
  image: string;
  calories: number;
  caffeineMg: number;
  rating: number; // out of 5
  popular: boolean;
}

// One choice in the customiser, e.g. "Large" (+Rs 200) or "Oat Milk" (+Rs 80).
export interface Option {
  name: string;
  extraPrice: number;
}

// One customised drink inside the cart.
export interface CartItem {
  id: string; // unique id for this cart line
  drinkId: string;
  name: string;
  image: string;
  size: string;
  milk: string;
  extras: string[];
  unitPrice: number; // price of one drink with all options
  quantity: number;
}
