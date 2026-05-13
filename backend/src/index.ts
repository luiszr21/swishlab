import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import positionsRoutes from './routes/positions';
import trainingsRoutes from './routes/trainings';
import categoriesRoutes from './routes/categories';
import userRoutes from './routes/users';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/positions', positionsRoutes);
app.use('/api/trainings', trainingsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
