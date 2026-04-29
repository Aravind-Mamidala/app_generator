# 🚀 AI App Generator

A full-stack, config-driven application that dynamically generates UI, APIs, and database operations based on structured JSON configuration.

---

## 🎯 Overview

This project is a **mini app generator** that reads a JSON configuration and builds:

* Dynamic Forms
* Dynamic Tables
* Backend APIs
* PostgreSQL Database Integration
* Authentication System

It is designed to handle **incomplete and flexible configurations** while maintaining stability.

---

## 🧠 Key Features

### 🔹 Dynamic Application Runtime

* UI generated from JSON config
* No hardcoded forms or tables
* Supports multiple entities

### 🔹 Authentication System

* Signup & Login
* JWT-based authentication
* User-scoped data access

### 🔹 CRUD Operations

* Create and fetch data dynamically
* Works for any entity defined in config

### 🔹 CSV Upload System

* Upload CSV files
* Automatically insert into database
* Works dynamically for different entities

### 🔹 Config-Driven Architecture

* Easily extendable
* Add new fields/components via JSON

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (Render)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
app-generator/
├── frontend-react/
│   ├── src/
│   ├── components/
│   └── config/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── db/
│   └── index.js
```

---

## ⚙️ How It Works

1. JSON config defines:

   * Entities
   * Fields
   * UI structure

2. Frontend:

   * Reads config
   * Renders dynamic form & table

3. Backend:

   * Handles dynamic routes (`/api/:entity`)
   * Stores data in PostgreSQL

4. Database:

   * Tables created dynamically (or manually)
   * Stores user-specific data

---

## 🔐 Authentication Flow

* User signs up → stored in DB
* User logs in → JWT token generated
* Token used for protected API routes

---

## 📊 CSV Upload Flow

1. Upload CSV file
2. Backend parses file
3. Inserts rows into DB
4. UI updates automatically

---

## 🌐 Live Demo

Frontend: https://app-generator-six.vercel.app/
Backend: https://app-generator-7qoq.onrender.com

---

## 🧪 How to Run Locally

### 1. Clone Repo

```
git clone https://github.com/Aravind-Mamidala/app_generator.git
cd app_generator
```

---

### 2. Backend Setup

```
cd backend
npm install
npm start
```

---

### 3. Frontend Setup

```
cd frontend-react
npm install
npm run dev
```

---

### 4. Database Setup (PostgreSQL)

Run:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT,
  status TEXT,
  user_id INTEGER
);
```

---

## ⚠️ Edge Cases Handled

* Missing fields in config
* Empty form submissions
* Invalid API responses
* Authentication failures
* CSV upload validation

---

## 🚀 Future Improvements

* Role-based access
* Better UI (Tailwind / Material UI)
* Config validation layer
* Auto DB schema generation
* Multi-entity dashboard

---

## 🎥 Demo Video

(Add Loom link here)

---

## 👨‍💻 Author

**Aravind**
BTech 4th Year
Full Stack Developer | ML Enthusiast

---

## ⭐ Conclusion

This project demonstrates:

* System design thinking
* Dynamic architecture
* Real-world problem handling
* End-to-end deployment

---

⭐ If you like this project, feel free to star the repo!
