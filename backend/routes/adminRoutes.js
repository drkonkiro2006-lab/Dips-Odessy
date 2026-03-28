import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to: C:\Zarimunya\FinanceHub\frontend\src\assets\Gallery
// Since this file is in backend/routes, we go up two levels to reach the root
const GALLERY_BASE_PATH = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'Gallery');

// 1. Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const title = req.body.title || 'Untitled_Folder';
        // Clean title to be folder-friendly (remove special characters)
        const folderName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const targetDir = path.join(GALLERY_BASE_PATH, folderName);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        cb(null, targetDir);
    },
    filename: (req, file, cb) => {
        // Use original name or timestamp to prevent overwriting
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// 2. The Gallery Upload Route
router.post('/upload-gallery', upload.array('images', 10), (req, res) => {
    try {
        const { title, description } = req.body;
        const folderName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const targetDir = path.join(GALLERY_BASE_PATH, folderName);

        // Save description.txt even if description is empty
        fs.writeFileSync(path.join(targetDir, 'description.txt'), description || "");

        res.status(200).json({ 
            success: true, 
            message: `Gallery '${title}' created successfully with ${req.files.length} images.` 
        });
    } catch (error) {
        console.error("Gallery Upload Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error during upload." });
    }
});

// 3. Blog Post Route (Placeholder for your 2nd Tab)
router.post('/upload-blog', (req, res) => {
    // Logic for blog will go here later
    res.json({ success: true, message: "Blog logic triggered" });
});

export default router;