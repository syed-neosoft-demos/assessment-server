import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const multerStorage = multer.diskStorage({
  destination: (req, image, cb) => {
    const basePath = __dirname?.split('src')[0];
    cb(null, basePath + 'public/upload');
  },
  filename: (req, image, cb) => {
    const ext = image.mimetype.split('/')[1];
    cb(null, `user-${req.headers?.id}-${Date.now()}.${ext}`);
    // cb(null, file?.originalname);
  }
});

const fileUpload = multer({ storage: multerStorage });
export default fileUpload;
