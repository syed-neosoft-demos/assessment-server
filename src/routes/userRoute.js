import express from 'express';
import {
  createPayment,
  getAUser,
  getAllUser,
  paymentSuccess
} from '../controllers/userController.js';
import { userAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.get('/get-user', userAuth, getAUser);
router.get('/get-all-user', userAuth, getAllUser);

router.post('/create-payment', userAuth, createPayment);
router.get('/payment-success', paymentSuccess);

export default router;
