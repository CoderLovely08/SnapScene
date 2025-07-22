# 📸 SnapScene – Cloud-Based Wallpaper Sharing Platform

**SnapScene** is a beginner-friendly, cloud-native web application that allows users to upload, explore, and interact with high-quality wallpapers. Built using a modern full-stack architecture and deployed on AWS, this project was created to help others learn how to develop and deploy an end-to-end web application using real-world tools and cloud infrastructure. SnapScene serves as both a functional app and an educational resource for anyone looking to understand full-stack development and AWS deployment in practice.

---

## 🚀 Project Overview

SnapScene allows users to:

* View and explore wallpapers uploaded by the community
* Register and manage personal accounts
* Upload custom wallpapers
* Like and download favorite wallpapers

The system utilizes **React** and **Tailwind CSS** on the frontend and a **Node.js/Express.js** backend with **Amazon RDS**, **S3**, and **EC2**, all monitored via **AWS CloudWatch**.

---

## 🧠 Core Modules

### 1. **User Module**

* User registration, login, and logout
* Token-based authentication with JWT
* Upload and interact with wallpapers (like/download)

### 2. **Wallpaper Module**

* Upload images via `multer` directly to **Amazon S3**
* Store metadata (tags, uploader ID, likes) in **PostgreSQL via Prisma**
* Explore wallpapers using API queries

### 3. **Admin (Future Scope)**

* Moderate content, view analytics
* Potential integration with CloudFront and load balancers for scaling

---

## ⚙️ Tech Stack
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-ffffff.svg?style=for-the-badge&logo=tailwindcss&logoColor=blue) ![React Query](https://img.shields.io/badge/reactquery-ffffff?style=for-the-badge&logo=reactquery&logoColor=#FF4154) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


### 🌐 Frontend

* **React.js** – Component-driven UI
* **Tailwind CSS** – Utility-first CSS
* **React Query** – Server state caching & sync
* **Axios** – API requests
* **React Hook Form** – Flexible form handling

### 🛠 Backend

* **Node.js + Express.js** – REST API
* **Prisma ORM** – Type-safe database access
* **PostgreSQL (RDS)** – Metadata storage
* **Multer + AWS S3** – File uploads
* **JWT** – Authentication
* **AWS CloudWatch** – Logging and monitoring

---

## 🏗️ AWS Architecture Overview

### Core Components

| Component      | Functionality                                    |
| -------------- | ------------------------------------------------ |
| **Amazon EC2** | Hosts the Express.js backend                     |
| **Amazon S3**  | Stores wallpaper image files                     |
| **Amazon RDS** | Stores metadata (likes, uploader ID, tags, etc.) |
| **Nginx**      | Acts as reverse proxy and serves frontend        |
| **VPC**        | Provides secure networking and isolation         |
| **CloudWatch** | Monitors application performance                 |

**Diagram Reference**: ![AWS Architecture](<docs/SnapScene AWS Architecture.png>)

---

## 🔁 API Endpoints

### 🔐 Auth Routes

```
POST   /auth/system/login       – Login user
POST   /auth/system/register    – Register user
POST   /auth/system/logout      – Logout user
```

### 👤 User Routes

```
GET    /users/profile           – Get logged-in user profile (token-protected)
```

### 🖼 Wallpaper Routes

#### Public

```
GET    /wallpapers/get-all       – Get all wallpapers
```

#### Protected

```
POST   /wallpapers/create        – Upload a new wallpaper
POST   /wallpapers/like          – Like a wallpaper
POST   /wallpapers/download      – Download a wallpaper
```

All protected routes require a valid JWT token in the `Authorization` header.

---

## 🧬 Data Flow

### Uploading a Wallpaper

1. React frontend collects file via a form (React Hook Form)
2. Axios sends a `multipart/form-data` request to `/wallpapers/create`
3. EC2 (Express.js) handles upload using `multer`, saves file to **S3**
4. Metadata is stored in **PostgreSQL** via **Prisma**
5. URL is returned to the frontend for rendering

### Exploring Wallpapers

* React app calls `/wallpapers/get-all`
* Server fetches metadata from **RDS** and returns S3 URLs
* Images are rendered in the gallery UI

---

## 🧩 Project Structure

### Backend

```
backend/
├── config/
│   └── multer.config.js
├── controllers/
│   └── v1/
│       └── Wallpaper.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── routes/
│   ├── auth.routes.js
│   ├── users.routes.js
│   └── wallpapers.routes.js
├── schema/
│   └── validation.schema.js
├── service/
│   └── core/
│       └── CommonController.js
├── utils/
│   ├── constants/
│   └── helpers/
├── app.js
└── .env
```

---

## 📊 Monitoring & Observability

* **AWS CloudWatch** monitors:

  * EC2 metrics (CPU, memory, I/O)
  * RDS metrics (query latency, connections)
  * S3 usage and request logs
  * Application logs and alarms for failures

---

## 📌 Future Enhancements

* ✅ Integrate **Amazon CloudFront** for image CDN delivery
* ✅ Add **commenting** and **tag filters**
* 🌀 Implement **pagination** and **search**
* 🧩 Add **role-based access** for moderation
* 🛡 Add **rate limiting** and **throttling**

