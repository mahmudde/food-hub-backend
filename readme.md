# 🍲 Food Hub - Relational Food Delivery Backend

A robust, type-safe, and scalable backend system for a food delivery platform. This project implements a relational database architecture, multi-role authentication (Admin, Provider, Customer), and a seamless onboarding flow for Google-authenticated users.

## 🚀 Live Demo & Repository

- **Repository:** [Your GitHub Link Here]
- **Base URL:** `http://localhost:5000/api/v1`
- **Auth Base URL:** `http://localhost:5000/api/auth`

---

## 🔑 Instructor/Admin Credentials

To evaluate the admin functionalities and protected routes, please use the following pre-seeded credentials:

| Role      | Email               | Password      |
| :-------- | :------------------ | :------------ |
| **Admin** | `admin@foodhub.com` | `Admin@12345` |

---

## 🛠️ Tech Stack

- **Framework:** Node.js with Express.js (TypeScript)
- **Database:** PostgreSQL (Hosted on Neon DB)
- **ORM:** Prisma
- **Authentication:** Better Auth (Google Social Login & Email/Password)
- **Validation:** Zod
- **API Testing:** Postman

---

## 🌟 Key Features

- **Relational Database Design:** Optimized one-to-one and one-to-many relationships between Users, Addresses, Provider Profiles, Meals, and Orders.
- **Unified Profile Update:** A "Master Controller" using Prisma Transactions that allows users to update personal info, manage addresses, and upgrade to a **Provider** role in a single request.
- **Better Auth Integration:** Secure session-based authentication (Cookie) with social login support.
- **Role-Based Access Control (RBAC):** Distinct permissions and flows for Customers, Providers, and Admins.
- **Data Integrity:** Ensuring clean database states even during complex multi-table updates.

---

## 📂 Project Structure

```text
src/
├── controllers/    # Request handlers (logic for each route)
├── services/       # Business logic & Prisma DB queries (Service Layer)
├── routes/         # API endpoint definitions
├── middlewares/    # Auth, Role-based guards, and error handlers
├── lib/            # Shared instances (PrismaClient, Better Auth config)
└── schema/         # Prisma Database Models
```

API Documentation

🔐 Authentication (Better Auth)
Method,Endpoint,Description
POST,/api/auth/sign-up/email,New user registration
POST,/api/auth/sign-in/email,User login
POST,/api/auth/sign-out,Logout (Session clear)
GET,/api/auth/get-session,Get current logged-in user session
GET,/api/auth/social/google,Initiate Google OAuth login

👤 Profile & User Management
Method,Endpoint,Description
GET,/api/v1/users/profile,View current user profile
PATCH,/api/v1/users/update-all,Unified update (Profile + Address + Provider Upgrade)
GET,/api/v1/users,List all users (Admin Only)

🥗 Food Meals (Menu Management)
Method,Endpoint,Description
GET,/api/v1/meals,List all meals (With Search/Filter)
GET,/api/v1/meals/:id,Get specific meal details
POST,/api/v1/meals,Add new meal (Admin Only)
PUT,/api/v1/meals/:id,Update meal info (Admin Only)
DELETE,/api/v1/meals/:id,Delete a meal (Admin Only)

🛒 Order Management
Method,Endpoint,Description
POST,/api/v1/orders,Place a new order (Customer)
GET,/api/v1/orders/my-orders,View user's order history
GET,/api/v1/orders/:id,View specific order details
PATCH,/api/v1/orders/:id/status,Update order status (Admin/Provider)
