import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({ destination: (req, file, cb) => {
    cb (null, path.join(__dirname, '../../uploads'));
},
filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
}
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|pg|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = allowedTypes.test(file.mimeType);

    if (mimeType && extname) {
        return cb (null, true);
    } else {
        cb(nerError ('Only image and PDFs are allowed'));
    }
};

const upload = multer({
    storage: storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
    fileFilter: fileFilter
});

export default upload;