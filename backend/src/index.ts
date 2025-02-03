import express from 'express';
import dotenv from 'dotenv';
import exerciseRoutes from './routes/exerciseRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', exerciseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});