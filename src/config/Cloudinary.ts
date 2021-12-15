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
    format: (a: any, b: any) => any;
  };
}

const multerOpts: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "record-keeper",
    format: async (req, file) => ["png", "jpg", "jpeg"],
  },
};

const storage = new CloudinaryStorage(multerOpts);

export { storage, cloudinary };
