// config/multer.js
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        image: /jpeg|jpg|png/,
        pdf: /pdf/,
    };

    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    const mimetype = file.mimetype;

    if (
        (allowedTypes.image.test(ext) && allowedTypes.image.test(mimetype)) ||
        (allowedTypes.pdf.test(ext) && allowedTypes.pdf.test(mimetype))
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only image and PDF files are allowed"));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter,
});

// For multiple files
export const uploadMultiple = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
]);
