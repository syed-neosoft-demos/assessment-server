import express from 'express';
import {
  forgetPassword,
  login,
  resetPassword,
  signup,
  verify
} from '../controllers/authController.js';
import { signupValidate } from '../middleware/bodyValidate.js';

const router = express.Router();

router.post('/signup', signupValidate, signup);
router.get('/verify', verify);
router.post('/login', login);
router.post('/forget', forgetPassword);
router.post('/reset', resetPassword);

export default router;
