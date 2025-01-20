import express from 'express';
import helloRoutes from './routes/helloRoutes.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
app.use(express.json());
app.use('/hello', helloRoutes);
app.use('/api', userRoutes);

export default app;
