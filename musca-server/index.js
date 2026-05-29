import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import userRoutes from './routes/useRoutes.js';

dotenv.config({ override: true });

if (process.env.MONGO_URI) {
  connectDB();
}

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.options('/{*any}', cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Musca server is running.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Musca server listening on port ${port}`);
  });
}

export default app;
