import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';


cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
  secure: true,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devburguer',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});



export default multer({ storage });