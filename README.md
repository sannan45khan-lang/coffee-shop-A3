# ☕ Brew Haven – Coffee Shop Ordering

**CS4032 Web Programming – Assignment 3 (Next.js Frontend)**

| | |
|---|---|
| **Group** | G10 |
| **Topic** | #12 – Coffee shop ordering |
| **Members** | Sannan Khan – 24i-2084 (Group Leader)<br>Mannan Bin Adnan – 24i-2004<br>Abdul Rehman – 24i-2092 |

## About the App

Brew Haven is a coffee shop ordering website. Customers can browse 18 drinks, search, filter and sort the menu, and open any drink to customise its **size, milk and extras while the price updates live**. Drinks go into an order (cart) where quantities can be changed, and a checkout form with validation places a mock order and shows a confirmation.

There is no backend: all data is mock data in `data/`, and "placing an order" only updates React state.

## How to Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000. To build for production: `npm run build`.

**Tech stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.

## Routes

| Route | What it shows | Component type |
|---|---|---|
| `/` | Home: hero section, features and the popular drinks | Server |
| `/menu` | Full menu with search by name, category filter and sort (price, rating, name) | Server page + `MenuBrowser` client component |
| `/menu/[id]` | **Dynamic route.** Drink detail plus the drink customiser with live price. An unknown id calls `notFound()` | Server page + `DrinkCustomizer` client component |
| `/order` | Order summary: change quantities, remove items, subtotal, tax and total | Server page + `OrderSummary` client component |
| `/checkout` | Checkout form with controlled inputs and validation errors, then an order confirmation | Server page + `CheckoutForm` client component |
| `/about` | Our story, values, team and location | Server |
| any other URL | Custom 404 page (`app/not-found.tsx`) | Server |

`app/menu/loading.tsx` is shown while the menu pages load. Every page sets its own title and description with the `metadata` export (or `generateMetadata` for the dynamic route).

## Folder Structure

```
app/            Routes (layout, pages, loading, not-found)
components/     14 reusable components, each with a typed Props interface
context/        CartContext – shared cart state (React Context + useState)
data/           Types (types.ts) and mock data (drinks.ts, options.ts)
public/images/  Drink images (shown with next/image)
```

## Client Components and Why

| Component | Why it needs `'use client'` |
|---|---|
| `MenuBrowser` | Search text, category and sort are `useState`, changed by `onChange` and `onClick` |
| `DrinkCustomizer` | Size, milk, extras and quantity are state, the price recalculates on every click, and it adds to the cart |
| `OrderSummary` | Reads the cart from Context, and the +, − and Remove buttons change it |
| `CheckoutForm` | Controlled inputs, validation on submit, and the confirmation state |
| `CartBadge` | Shows the live cart count from Context in the navbar |
| `CartContext` | Holds the cart with `useState`, shared by all of the above |

All other pages and components (Home, About, Navbar, Footer, DrinkCard, …) stay **Server Components** because they only display data.

## Contribution Table

| Member | Pages / routes | Components and other files |
|---|---|---|
| **Sannan (24i-2084)**: layout, home, about and the cart (stateful feature) | `app/layout.tsx`, `/` (Home), `/about`, `/order`, `app/not-found.tsx` | `Navbar`, `Footer`, `PageHeader`, `CartBadge`, `CartItemRow`, `OrderSummary`; `context/CartContext.tsx`; project setup, Tailwind theme, images, README |
| **Mannan (24i-2004)**: listing, search/filter and detail | `/menu`, `/menu/[id]` (dynamic route), `app/menu/loading.tsx` | `DrinkCard`, `SearchBar`, `MenuBrowser`; `data/types.ts`, `data/drinks.ts` (18 drinks) |
| **Abdul Rehman (24i-2092)**: drink customiser and checkout form | `/checkout` | `DrinkCustomizer` (live price), `OptionPicker`, `CheckoutForm` (validation), `FormInput`, `Button`; `data/options.ts` |

## Links

- **GitHub repository:** https://github.com/sannan45khan-lang/coffee-shop-A3
- **Video demo:** TODO – add Google Drive / YouTube link (sharing: *Anyone with the link – Viewer*)
- **Live site (Vercel bonus):** https://coffee-shop-a3.vercel.app

## AI Tools Used

We used **Claude (Claude Code by Anthropic)** to help plan the project structure, generate the starting code for pages and components, and check the rubric requirements. Each member reviewed, tested and understands the code for their own part, and can explain every line.
