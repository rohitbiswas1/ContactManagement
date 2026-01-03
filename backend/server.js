require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Config
const PORT = parseInt(process.env.PORT, 10) || 5002;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is not set. Create backend/.env with MONGODB_URI and restart.');
  process.exit(1);
}

let server;

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.info('MongoDB connected (Atlas)');

    server = app.listen(PORT, () => {
      console.info(`Server listening on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} already in use. Set PORT or stop the conflicting process.`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

function gracefulShutdown(signal) {
  console.info(`Received ${signal}. Closing server and MongoDB connection...`);
  if (server) {
    server.close(async () => {
      try {
        // mongoose.connection.close returns a promise in mongoose v6/7
        await mongoose.connection.close(false);
        console.info('MongoDB connection closed. Exiting.');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

    setTimeout(() => {
      console.warn('Force exit after timeout');
      process.exit(1);
    }, 10000).unref();
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();