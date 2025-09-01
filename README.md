# School Census Management System 📚

A modern, full-stack web application for managing school census data with secure image upload capabilities. Built with Next.js, TypeScript, and deployed on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)
![Cloudinary](https://img.shields.io/badge/File_Storage-Cloudinary-blue?style=for-the-badge&logo=cloudinary)
![Aiven](https://img.shields.io/badge/Database-Aiven-orange?style=for-the-badge&logo=aiven)

## ✨ Features

- **📊 School Data Management** - Add, view, and manage school information
- **🖼️ Secure Image Uploads** - Cloudinary integration for reliable file storage
- **🌐 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🔒 Type Safety** - Full TypeScript implementation for robust development
- **☁️ Cloud Database** - MySQL hosted on Aiven's free tier
- **⚡ Fast Performance** - Built on Next.js 14 with App Router
- **🔐 Environment Variables** - Secure configuration management

## 🚀 Tech Stack

- **Framework:** Next.js 14 with TypeScript
- **Database:** MySQL hosted on Aiven (Free Tier)
- **File Storage:** Cloudinary for image uploads and management
- **Deployment:** Vercel
- **Database Driver:** mysql2/promise
- **Styling:** CSS Modules
- **Runtime:** Node.js

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MySQL database (local or cloud)
- Cloudinary account for image storage

### 1. Clone the Repository
```bash
git clone https://github.com/Niraj1910/school_census_assignement.git
cd school_census_assignement
```

##.env.local
```bash
# Database Configuration (Aiven MySQL)
DB_HOST=your_aiven_mysql_host
DB_USER=your_aiven_mysql_user
DB_PASS=your_aiven_mysql_password
DB_NAME=your_aiven_mysql_database
DB_PORT=your_aiven_mysql_port

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#run the server
```bash
npm install
npm run dev
```

