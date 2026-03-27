const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "YOUR_MAILTRAP_USER", // Điền user của bạn
    pass: "YOUR_MAILTRAP_PASS"  // Điền pass của bạn
  }
});

const sendPasswordEmail = async (email, username, password) => {
  const mailOptions = {
    from: '"Hệ Thống Admin" <admin@cuahang.com>',
    to: email,
    subject: "Thông tin tài khoản đăng nhập hệ thống",
    html: `
      <h3>Chào ${username},</h3>
      <p>Tài khoản của bạn đã được tạo thành công trên hệ thống.</p>
      <p><b>Mật khẩu đăng nhập của bạn là:</b> <code>${password}</code></p>
      <p>Vui lòng đăng nhập và đổi mật khẩu sớm nhất có thể.</p>
      <br>
      <p>Trân trọng,</p>
      <p>Ban Quản Trị</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordEmail };