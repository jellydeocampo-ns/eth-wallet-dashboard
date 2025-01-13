import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ethRoutes from './routes/ethRoutes';
import mongoose from 'mongoose';
import { createClient } from 'redis';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const REDIS_URL = process.env.REDIS_URL || '';

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('📦 MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Redis connection
export const redisClient = createClient({ url: REDIS_URL });
redisClient.connect()
  .then(() => console.log('⚡ Redis connected'))
  .catch((err) => console.error('Redis connection error:', err));

// API Routes
app.use('/api', ethRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
