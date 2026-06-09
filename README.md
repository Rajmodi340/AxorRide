# Rydex - Real-Time Ride Booking Platform

Rydex is a modern, enterprise-grade, real-time ride-booking and driver-dispatch system. The platform consists of a next-generation web application powered by **Next.js 15 (App Router)** and a lightweight **real-time Socket.io server** that handles live tracking, chat, and location updates.

---

## 🚀 Key Features

### 👤 User Roles & Dashboards
*   **Rider (User):** Simple interface to search, book, chat, and pay for rides with live tracking of arriving drivers.
*   **Partner (Driver/Vendor):** Comprehensive step-by-step onboarding, document verification upload (saved to Cloudinary), bank details integration, and real-time location streaming.
*   **Admin:** Interactive dashboard displaying key business analytics and metrics using Recharts, with the ability to verify partner documents and conduct video-KYC.

### 📍 Real-Time Location & Maps
*   Interactive maps powered by **Leaflet** and **Geoapify**.
*   High-frequency, real-time driver location updates streamed via WebSockets.
*   Geospatial queries on MongoDB utilizing GeoJSON Point coordinates to locate nearby available drivers.

### 💬 Instant Communication
*   Dedicated, booking-specific live chat rooms between riders and drivers.
*   **Video-KYC Integration** utilizing **ZegoCloud UIKit** for driver identity verification.

### 💳 Payment Gateways
*   Secure multi-provider payment integrations supporting both **Stripe** and **Razorpay** checkout workflows.

### 🔒 Secure Authentication
*   Authentication using **NextAuth.js (v5 Beta)** supporting:
    *   Credentials-based login (encrypted via `bcryptjs`).
    *   Social login with **Google OAuth**.

---

## 🛠 Tech Stack

### Frontend & Core App (`/rydex`)
*   **Framework:** Next.js 15 (App Router, TypeScript)
*   **State Management:** Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
*   **Styling:** TailwindCSS 4, Framer Motion (animations), Lucide React (icons)
*   **Mapping:** Leaflet & React Leaflet
*   **Analytics/Charts:** Recharts
*   **Database ORM:** Mongoose (MongoDB)
*   **Video Platform:** ZegoCloud UI Kit
*   **Image Storage:** Cloudinary

### Real-Time Microservice (`/socketServer`)
*   **Runtime:** Node.js (ES Modules)
*   **Framework:** Express
*   **WebSocket Library:** Socket.io
*   **Database Client:** Mongoose

---

## 📂 Project Directory Structure

```text
RydexDemo/
├── rydex/                     # Next.js Front-end & Core backend APIs
│   ├── src/
│   │   ├── app/               # Next.js App Router (pages & APIs)
│   │   ├── components/        # Reusable UI Components
│   │   ├── models/            # Mongoose Schemas (User, Booking, Vehicle etc.)
│   │   ├── redux/             # Redux slice state managers
│   │   ├── lib/               # Database connectivity and utils
│   │   └── hooks/             # Custom React Hooks
│   ├── .env.local             # Local environment variables
│   ├── tsconfig.json          # TypeScript Configuration
│   └── package.json
│
└── socketServer/              # Node.js WebSocket coordination server
    ├── models/                # User socket mapping models
    ├── index.js               # Main socket application entry-point
    ├── .env                   # Environment variables
    └── package.json
```

---

## ⚙️ Configuration & Environment Variables

Create the respective configuration files in each directory:

### 1. Frontend Configuration: `rydex/.env.local`
```env
# MongoDB Connection
MONGODB_URL=your_mongodb_connection_string

# NextAuth configuration
AUTH_SECRET=your_auth_secret # Generate using: openssl rand -base64 32

# SMTP Configuration (Nodemailer)
EMAIL=your_email@gmail.com
PASS=your_email_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary Credentials (for document uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ZegoCloud (Video KYC)
NEXT_PUBLIC_ZEGO_APP_ID=your_zegocloud_app_id
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_zegocloud_server_secret

# Maps & Geocoding
NEXT_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_key

# Socket Server Endpoint
NEXT_PUBLIC_SOCKET_SERVER=http://localhost:8000

# Razorpay Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key_id

# AI/Language Model Integration
GEMINI_API_URL=your_gemini_api_endpoint_with_key
```

### 2. Socket Server Configuration: `socketServer/.env`
```env
PORT=8000
NEXT_BASE_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string
```

---

## 🚀 Getting Started Locally

Follow these steps to run both services locally on your machine.

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Instance (Atlas or Local)

### Step 1: Clone and install dependencies
```bash
# Clone the repository
git clone <your-repository-url>
cd RydexDemo

# Install dependencies for Next.js App
cd rydex
npm install

# Install dependencies for Socket Server
cd ../socketServer
npm install
```

### Step 2: Run the projects
Run both servers concurrently to enable full real-time capabilities.

#### Running Next.js Frontend
```bash
cd rydex
npm run dev
# App will start on http://localhost:3000
```

#### Running Socket Server
```bash
cd socketServer
npm run dev
# Socket server will run on http://localhost:8000
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues/).

## 📄 License
This project is licensed under the ISC License.
