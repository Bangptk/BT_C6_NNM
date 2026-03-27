const fs = require('fs');
const csv = require('csv-parser');
const crypto = require('crypto');
const { sendPasswordEmail } = require('../utils/mailer');
// Import model User của bạn ở đây (ví dụ: const User = require('../models/user.model');)

const importUsersFromCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Vui lòng upload file CSV!' });
  }

  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          const { username, email } = row;

          // 1. Tạo password random 16 kí tự
          const randomPassword = crypto.randomBytes(8).toString('hex'); // 8 bytes = 16 kí tự hex
          
          // 2. Gán role user (Chuẩn bị data để lưu database)
          const newUser = {
            username: username,
            email: email,
            password: randomPassword, // Nhớ băm (hash) password bằng bcrypt trước khi lưu DB thật nha!
            role: 'user'
          };

          // TODO: Lưu newUser vào Database (ví dụ: await User.create(newUser);)
          console.log('User chuẩn bị lưu:', newUser);

          // 3. Gửi email qua Mailtrap
          await sendPasswordEmail(email, username, randomPassword);
        }

        // Xóa file tạm sau khi xử lý xong
        fs.unlinkSync(filePath); 

        res.status(200).json({ message: 'Import user và gửi mail thành công!' });
      } catch (error) {
        console.error('Lỗi khi xử lý:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình xử lý.' });
      }
    });
};

module.exports = { importUsersFromCSV };