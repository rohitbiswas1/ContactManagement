# 📇 Contact Management System

A full-stack web application for managing contacts with a clean, intuitive interface. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application allows users to create, read, update, and delete contacts efficiently.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-81.3%25-yellow)](https://github.com/rohitbiswas1/ContactManagement)
[![CSS](https://img.shields.io/badge/CSS-15.7%25-blue)](https://github.com/rohitbiswas1/ContactManagement)

## 🌐 Live Demo

- **Frontend:** [https://contactmanagementweb.netlify.app/](https://contactmanagementweb.netlify.app/)
- **Backend API:** [https://contactmanagement-9d92.onrender.com/](https://contactmanagement-9d92.onrender.com/) 
---
## Website UI 💻
<img width="1919" height="1041" alt="image" src="https://github.com/user-attachments/assets/84a4e864-be69-4ed9-a2c9-63d525fbc2df" />

## ✨ Features

- ✅ **Create Contacts** - Add new contacts with name, email, phone, and address
- 📋 **View Contacts** - Display all contacts in an organized list
- ✏️ **Update Contacts** - Edit existing contact information
- 🗑️ **Delete Contacts** - Remove contacts from the database  {For now only admin can delete from backend}
- 🔍 **Search Functionality** - Quickly find contacts by name or email
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Optimized for quick load times and smooth interactions

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **CSS3** - Styling and responsive design
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for storing contact data
- **Mongoose** - MongoDB object modeling

---

## 📁 Project Structure

```
ContactManagement/
├── frontend/               # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service files
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── backend/               # Express backend application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── config/            # Configuration files
│   └── package.json
│
├── server.js              # Backend server entry point
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohitbiswas1/ContactManagement.git
   cd ContactManagement
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**

   If using local MongoDB:
   ```bash
   mongod
   ```

   Or use MongoDB Atlas connection string in your `.env` file

6. **Run the Application**

   Open two terminal windows:

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   # Or for development with auto-restart:
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🌍 Deployment Guide

### Frontend Deployment (Netlify)

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Sign up at [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command:** `cd frontend && npm install && npm run build`
     - **Publish directory:** `frontend/build`
   - Add environment variable:
     - `REACT_APP_API_URL=https://your-api.onrender.com/api`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Domain settings
   - Add your custom domain
   - Update DNS records as instructed

**Live URL:** `https://your-app.netlify.app` *(Update after deployment)*

### Backend Deployment (Render)

1. **Deploy to Render**
   - Sign up at [Render](https://render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure settings:
     - **Name:** contact-management-api
     - **Root Directory:** `backend` (if applicable)
     - **Build Command:** `npm install`
     - **Start Command:** `node server.js` or `npm start`
     - **Environment:** Node

2. **Environment Variables**
   Add the following in Render dashboard:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   ```

3. **Database Setup**
   - Use MongoDB Atlas for production database
   - Whitelist Render's IP addresses in MongoDB Atlas

**Live URL:** `https://your-api.onrender.com` *(Update after deployment)*

### Post-Deployment

1. Update frontend `.env` or Netlify environment variables with Render backend URL
2. Redeploy frontend on Netlify
3. Test all CRUD operations on the live site
4. Monitor application logs for any errors

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get contact by ID |
| POST | `/api/contacts` | Create new contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |

### Example Request Body (POST/PUT)
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

---

## ⚡ Performance Checklist

### Frontend Optimization
- [ ] **Code Splitting** - Implement React lazy loading for routes
- [ ] **Image Optimization** - Compress and use WebP format for images
- [ ] **Minimize Bundle Size** - Remove unused dependencies
- [ ] **Enable Caching** - Configure service workers for offline support
- [ ] **CSS Optimization** - Minimize and inline critical CSS
- [ ] **Font Loading** - Use font-display: swap for web fonts
- [ ] **Lazy Load Components** - Load components only when needed
- [ ] **Optimize Re-renders** - Use React.memo() and useMemo() hooks
- [ ] **CDN Usage** - Serve static assets from CDN

### Backend Optimization
- [ ] **Database Indexing** - Add indexes on frequently queried fields
- [ ] **Query Optimization** - Use select() to fetch only required fields
- [ ] **Enable Compression** - Use compression middleware for responses
- [ ] **Rate Limiting** - Implement rate limiting to prevent abuse
- [ ] **Caching Strategy** - Use Redis for frequently accessed data
- [ ] **Error Handling** - Implement proper error logging and monitoring
- [ ] **API Response Time** - Aim for <200ms response time
- [ ] **Connection Pooling** - Configure MongoDB connection pool size
- [ ] **Environment Variables** - Never commit sensitive data to Git

### Security Checklist
- [ ] **Input Validation** - Validate and sanitize all user inputs
- [ ] **CORS Configuration** - Set proper CORS policies
- [ ] **HTTPS Only** - Enforce HTTPS in production
- [ ] **Helmet.js** - Use Helmet for security headers
- [ ] **Rate Limiting** - Prevent brute force attacks
- [ ] **MongoDB Injection** - Use Mongoose schema validation
- [ ] **XSS Protection** - Sanitize user-generated content
- [ ] **Authentication** - Add JWT-based authentication (if needed)

### Monitoring & Analytics
- [ ] **Performance Monitoring** - Set up Google Analytics or similar
- [ ] **Error Tracking** - Integrate Sentry or LogRocket
- [ ] **Uptime Monitoring** - Use UptimeRobot or Pingdom
- [ ] **API Monitoring** - Track API response times and errors
- [ ] **User Analytics** - Monitor user behavior and interactions

---

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rohit Biswas**
- GitHub: [@rohitbiswas1](https://github.com/rohitbiswas1)
- Repository: [ContactManagement](https://github.com/rohitbiswas1/ContactManagement)

---

## 🙏 Acknowledgments

- React Documentation
- Express.js Community
- MongoDB Atlas
- Netlify & Render for hosting platforms

---

## 📧 Support

If you have any questions or need help, please:
- Open an [Issue](https://github.com/rohitbiswas1/ContactManagement/issues)
- Email: *your-email@example.com* *(Add your email)*

---

## 🗺️ Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement search and filter functionality
- [ ] Add contact categories/groups
- [ ] Export contacts to CSV/Excel
- [ ] Import contacts from CSV
- [ ] Dark mode support
- [ ] Contact photo uploads
- [ ] Email integration
- [ ] Mobile app version

---

<div align="center">

Made with ❤️ by Rohit Biswas

⭐ Star this repository if you find it helpful!

</div>
