import multer from 'multer';
import { v4 } from 'uuid';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (_request, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`);
      return callback(null, uniqueName);
    },
  }),
};