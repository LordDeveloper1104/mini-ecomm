# ShopNow - Frontend

E-commerce storefront built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios


## Setup

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

Make sure the backend is running at `http://localhost:4000` before starting.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Product listing with search, filter, sort |
| `/products/:id` | Product detail with quantity selector |
| `/cart` | Cart with quantity update and order summary |

## Features

- Product listing with search by name
- Filter by category
- Sort by price or newest
- Product detail page with quantity selector
- Add to bag with live count in navbar
- Cart with quantity update and item removal
- Order summary with subtotal
- Loading skeletons on all pages
- Empty and error states throughout
- Fully responsive