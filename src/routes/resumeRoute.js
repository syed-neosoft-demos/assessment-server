import express from 'express';
import {
  createResume,
  getAllResume,
  getResume,
  updateResume
} from '../controllers/resumeController.js';
import fileUpload from '../middleware/fileUpload.js';
import { userAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.post('/create', userAuth, fileUpload.single('image'), createResume);
router.put('/update', userAuth, fileUpload.single('image'), updateResume);

router.get('/get-all-resume', userAuth, getAllResume);
router.get('/get-resume', userAuth, getResume);

export default router;
