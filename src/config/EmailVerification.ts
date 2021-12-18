const setEmailContent = (
  username: string,
  verificationCode: string,
  userId: string
) => {
  const html = `
        <html>
          <body>
            <h2>Hi ${username}!</h2>
            <p>Thank you for registering to Records Keeper</p>
            <p>Please click <a href=${process.env.HOST}/api/v1/auth/verify/${userId}/${verificationCode}>here</a> to verify your account</p>
          </body>
        </html>
        `;

  return html;
};

const generateCode = () => {
  return (Math.random() * 10).toString().replace(".", "");
};

export { generateCode, setEmailContent };
