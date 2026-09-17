# ShopNow - Backend

REST API built with Node.js, Express, and MongoDB Atlas.

## Tech Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- ES Modules (`"type": "module"`)



## Setup

```bash
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGODB_URI="your_mongodb_connection_string"
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

Server runs at `http://localhost:4000`

## API Routes

### Products

| Method | Route                           | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | `/api/products`                 | Get all products    |
| GET    | `/api/products/categories`      | Get all categories  |
| GET    | `/api/products/:id`             | Get single product  |
| GET    | `/api/products?search=`         | Search by name      |
| GET    | `/api/products?category=`       | Filter by category  |
| GET    | `/api/products?minPrice=`       | Filter by min price |
| GET    | `/api/products?maxPrice=`       | Filter by max price |
| GET    | `/api/products?sort=price_asc`  | Sort low to high    |
| GET    | `/api/products?sort=price_desc` | Sort high to low    |
| GET    | `/api/products?sort=newest`     | Sort by newest      |

### Cart

| Method | Route                                  | Description           |
| ------ | -------------------------------------- | --------------------- |
| POST   | `/api/cart`                            | Add item to cart      |
| GET    | `/api/cart/:sessionId`                 | Get cart by session   |
| PUT    | `/api/cart/:sessionId/item/:productId` | Update item quantity  |
| DELETE | `/api/cart/:sessionId/item/:productId` | Remove item from cart |

### Cart Request Body (POST)

```json
{
  "sessionId": "guest-session-001",
  "productId": "product_id_here",
  "quantity": 1
}
```

## Scripts

```bash
npm run dev    # Start with nodemon
npm start      # Start without nodemon
npm run seed   # Seed products to DB
```
