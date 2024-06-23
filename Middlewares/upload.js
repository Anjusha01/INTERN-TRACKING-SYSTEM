import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get current module's directory path

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = join(__dirname, '../uploads/');
        if (file.fieldname === 'syllabusFile') {
            uploadPath = join(__dirname, '../uploads/documents/');
        } else if (file.fieldname === 'imageFile') {
            uploadPath = join(__dirname, '../uploads/images/');
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
