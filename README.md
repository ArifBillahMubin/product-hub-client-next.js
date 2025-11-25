# 📘 ProductHub – Product Management Application

ProductHub is a modern and responsive product management application built using **Next.js (App Router)** for the frontend, **Firebase Authentication** for secure login, and a **Node.js + Express.js backend** with MongoDB.  
This project includes public and protected pages, CRUD operations, image uploading, and polished UI components.

---

## 🚀 Live Demo
- **Client Live Link:** _Add your Vercel link here_
- **Server Live Link:** _Add your backend API link here_

---

## 📂 Repositories
- **Client Repository:** _Add GitHub repo link_
- **Server Repository:** _Add GitHub repo link_

---

# 📑 Features

## ⭐ 1. Landing Page (7 Sections)
- Navbar (logo, routes, login/register, user dropdown)
- Hero section  
- Features section  
- Popular Products  
- Why Choose Us  
- Banner/Testimonial  
- Footer with social links  

---

## ⭐ 2. Authentication
- Firebase Email/Password login
- Google Sign-In (Firebase Provider)
- Protected routes with custom middleware
- Redirects user to the previous page after login

---

## ⭐ 3. Products Page
- List of all products in responsive cards
- Search bar + category filter UI
- Card includes:
  - Image
  - Title
  - Short description (ellipsis)
  - Price
  - Details button

---

## ⭐ 4. Product Details Page
- Large product banner image
- Full description
- Price, priority, date
- User information
- Back to Products button

---

## ⭐ 5. Add Product (Protected)
Form fields:
- Product Title  
- Short Description  
- Full Description  
- Price  
- Date  
- Priority (Low, Normal, High)  
- Image Upload (ImgBB API)

Additional features:
- User information auto-loaded  
- SweetAlert confirmation  
- Redirect after submission

---

## ⭐ 6. Manage Products (Protected)
- Shows user-added products
- Responsive grid/table
- Actions per product:
  - View  
  - Edit  
  - Delete  
- SweetAlert confirmation for deletion

---

# 🛠 Tech Stack

## Frontend
- Next.js 14  
- React  
- Tailwind CSS  
- Firebase Authentication  
- Axios  
- SweetAlert2  
- React Icons  

## Backend
- Node.js  
- Express.js  
- MongoDB  
- CORS  
- dotenv  

## External Services
- ImgBB (Image Upload API)

---

# 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/popular-products` | Get 3 high-priority products |
| GET | `/all-products` | Get all products |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Add product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

---

# 📁 Project Structure



---

# ⚙️ Installation & Setup

## Client Setup
```bash
git clone <client-repo-link>
cd producthub-client
npm install
```

### Create `.env.local`
```
NEXT_PUBLIC_FIREBASE_API_KEY=yourKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourProjectId
NEXT_PUBLIC_IMGBB_KEY=yourImgBBKey
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Run Client
```bash
npm run dev
```

---

## Backend Setup
```bash
git clone <server-repo-link>
cd producthub-server
npm install
```

### Create `.env`
```
MONGO_URI=yourMongoURL
```

### Run Backend
```bash
npm start
```

---

# 🗺 Route Summary

## Public Routes
- `/` – Landing Page  
- `/products` – All Products  
- `/products/[id]` – Product Details  
- `/login`  
- `/register`

## Protected Routes
- `/add-product`  
- `/manage-products`

---

# 📜 License
This project is for educational purposes only.

---

# 🙌 Acknowledgements
- Next.js  
- Firebase  
- Tailwind CSS  
- MongoDB  
- ImgBB  

