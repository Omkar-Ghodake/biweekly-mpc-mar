const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define upload directory
const uploadDir = path.join(__dirname, "../public/temp");

// Ensure the directory exists before saving files
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use absolute path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid duplicates
    }
});

const upload = multer({ storage });

module.exports = upload;
