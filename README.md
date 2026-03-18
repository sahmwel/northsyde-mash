# Northsyde Backend API

Northsyde is a global cultural platform connecting Nigerian/UK music, sports, nightlife, and creative experiences with the world. This backend API powers the platform, handling user authentication, event management, and media uploads.

## ✨ Features

- **User Registration & Login** – Secure JWT-based authentication with password hashing.
- **Profile Management** – Users can upload a portfolio file (image/PDF) during registration.
- **Discipline Selection** – Users choose from predefined categories (Music, Sports, Fashion, etc.).
- **Event Management** – Admins can create, update, and delete events; public users can view events.
- **File Uploads** – Portfolio files are stored locally (or in cloud storage in production) and served statically.
- **Dockerized** – Easy local development and production deployment with Docker Compose.
- **PostgreSQL Database** – Using Prisma ORM for type-safe database access and migrations.

## 🛠️ Tech Stack

- **Node.js** (v20) + **Express** – Backend framework.
- **Prisma** – ORM for PostgreSQL with migrations.
- **PostgreSQL** – Relational database.
- **JWT** – Authentication.
- **Multer** – File upload handling.
- **Docker** & **Docker Compose** – Containerization.
- **bcryptjs** – Password hashing.

## 📦 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (recommended)
- OR Node.js (v18+) and PostgreSQL installed locally

### Clone the Repository

```bash
git clone https://github.com/yourusername/northsyde-backend.git
cd northsyde-backend
