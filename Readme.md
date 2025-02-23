# **📄 Consumable Detail Management Portal - Documentation**  

## **Table of Contents**
1. [Introduction](#introduction)  
2. [System Architecture](#system-architecture)  
3. [Technology Stack](#technology-stack)  
4. [Features & Functionalities](#features--functionalities)  
5. [User Roles & Permissions](#user-roles--permissions)  
6. [API Documentation](#api-documentation)  
7. [Frontend & Backend Setup](#frontend--backend-setup)  
8. [Database Schema](#database-schema)  
9. [Authentication & Authorization](#authentication--authorization)  
10. [Error Handling & Logging](#error-handling--logging)  
11. [Deployment Guide](#deployment-guide)  
12. [Future Enhancements](#future-enhancements)  

---

## **1. Introduction**  
The **Consumable Detail Management Portal** is a **MERN stack-based** web application that streamlines consumable inventory management. It enables **Admins** to manage product inventory and user requests, while **Users** can request products and track their statuses.

### **Objectives**
- Efficient product inventory management.
- User request submission & approval system.
- Order tracking with history.
- Secure authentication & role-based access.

---

## **2. System Architecture**  
The system follows the **MVC (Model-View-Controller)** architecture:  
- **Frontend (React.js):** Handles UI interactions and API communication.  
- **Backend (Node.js & Express.js):** Manages API requests and business logic.  
- **Database (MongoDB):** Stores users, products, requests, and order data.  
- **Authentication (JWT):** Secure login and role-based access.  

---

## **3. Technology Stack**  
| Component  | Technology  |
|------------|------------|
| Frontend   | React.js, React Router, Axios, Context API  |
| Backend    | Node.js, Express.js, Mongoose  |
| Database   | MongoDB Atlas (Cloud)  |
| Authentication | JWT (JSON Web Token)  |
| Deployment | Netlify (Frontend), Render (Backend)  |

---

## **4. Features & Functionalities**  
### **4.1 Admin Features**
✅ Add, Edit, Delete Products  
✅ Manage Product Stock  
✅ Approve/Reject Product Requests  
✅ Manage Users  
✅ View Order History  
✅ Track Product Usage  

### **4.2 User Features**
✅ Register/Login  
✅ Browse Available Products  
✅ Request Products (With Quantity & Description)  
✅ View Request History & Order Status  
✅ Manage Personal Profile  

---

## **5. User Roles & Permissions**  
| Role | Permissions |
|------|------------|
| **Admin** | Full control over inventory, user requests, approvals, and product management. |
| **User** | Request products, view stock, and track order statuses. |

---

## **6. API Documentation**  

### **6.1 Authentication API**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user (Admin/User) |
| `POST` | `/api/auth/login` | Login & generate JWT token |

### **6.2 Product Management API**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/products` | Add a new product (Admin) |
| `GET` | `/api/products` | Get all products |
| `PUT` | `/api/products/:id` | Update product details (Admin) |
| `DELETE` | `/api/products/:id` | Delete a product (Admin) |

### **6.3 Request Management API**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/requests` | Create a product request (User) |
| `GET` | `/api/requests` | Get all requests (Admin) |
| `PUT` | `/api/requests/:id/approve` | Approve request (Admin) |
| `PUT` | `/api/requests/:id/reject` | Reject request (Admin) |

---

## **7. Frontend & Backend Setup**  
### **7.1 Frontend Setup (React.js)**
```sh
git clone <repo-url>
cd frontend
npm install
npm start
```
**Configuration:**
- Update `BASE_URL` in `src/api/config.js` to match backend URL.

---

### **7.2 Backend Setup (Node.js + Express)**
```sh
cd backend
npm install
npm start
```
**Configuration:**
- Create a `.env` file and set:  
  ```
  MONGO_URI=<MongoDB_Atlas_Connection>
  JWT_SECRET=<YourSecretKey>
  ```

---

## **8. Database Schema**  

### **8.1 User Schema (MongoDB)**
```js
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
```

### **8.2 Product Schema**
```js
const ProductSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  returnable: Boolean
});
```

### **8.3 Request Schema**
```js
const RequestSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});
```

---

## **9. Authentication & Authorization**  
- **JWT (JSON Web Token)** is used for user authentication.  
- **Middleware to protect routes:**
```js
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
```

---

## **10. Error Handling & Logging**  
- **Try-Catch Blocks**: Ensures API stability.  
- **Logging**: Use `console.log()` for debugging & `winston` for production logs.  
- **Global Error Handler**:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});
```

---

## **11. Deployment Guide**  
### **11.1 Deploy Backend on Render**
1. Push your code to GitHub.
2. Create a new service on [Render](https://render.com/).
3. Link the GitHub repository & set environment variables.
4. Click "Deploy".

### **11.2 Deploy Frontend on Netlify**
1. Push React frontend to GitHub.
2. Sign up on [Netlify](https://netlify.com/).
3. Import the repository & set `REACT_APP_API_URL`.
4. Click "Deploy".

---

## **12. Future Enhancements**  
✅ **Email Notifications** for approvals  
✅ **Search & Filtering** in product list  
✅ **Analytics Dashboard** for usage statistics  
✅ **Role-Based UI** for better UX  

---

## **📌 Conclusion**  
The **Consumable Detail Management Portal** is a robust inventory system with **role-based access, request tracking, and product management**. This documentation provides a structured approach for developers to set up and enhance the system further.

🚀 **Next Steps:**  
- Set up **Database & APIs**  
- Deploy backend & frontend  
- Optimize for performance  

