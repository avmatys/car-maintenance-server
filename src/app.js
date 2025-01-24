import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import modelRoutes from './routes/modelRoutes.js'
import carRoutes from './routes/carRoutes.js'

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/models', modelRoutes);
app.use('/api/v1/cars', carRoutes);

export default app;
