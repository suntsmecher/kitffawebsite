import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import prisma from '../config/db.js';

const router = Router();

router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post('/purchase', authenticateToken, async (req, res) => {
  // Stripe integration + command execution logic here
  res.json({ success: true, message: 'Purchase processed' });
});

export default router;
