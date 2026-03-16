import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';


const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (cloudinaryUrl) {
  const url = new URL(cloudinaryUrl);
  const cloud_name = url.hostname;
  const api_key = url.username;
  const api_secret = url.password;

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
} else {
  console.error('CLOUDINARY_URL not found');
}


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devburguer',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});



export default multer({ storage });