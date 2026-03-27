const express = require('express');
const router = express.Router();
const multer = require('multer');
const { importUsersFromCSV } = require('../controllers/userController');

// Cấu hình nơi lưu file upload tạm thời
const upload = multer({ dest: 'uploads/' });

// Tạo route nhận file CSV với field name là 'file'
router.post('/import', upload.single('file'), importUsersFromCSV);

module.exports = router;