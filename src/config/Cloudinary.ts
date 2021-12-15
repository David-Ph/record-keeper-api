import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

declare interface cloudinaryOptions extends Options {
  params: {
    folder: string;
    allowed_formats: string[];
  };
}

const multerOpts: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "records-keeper",
    allowed_formats: ["png", "jpeg", "jpg"],
  },
};

const storage = new CloudinaryStorage(multerOpts);

export { storage, cloudinary };
