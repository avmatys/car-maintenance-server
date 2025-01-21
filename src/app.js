import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

export default app;
