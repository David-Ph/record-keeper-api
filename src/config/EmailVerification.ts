const setEmailContent = (username: string, verificationCode: string) => {
  const html = `
        <h2>Hi ${username}!</h2>
        <p>Thank you for registering to Records Keeper</p>
        <p>Please click <a href=${process.env.HOST}/api/v1/auth/verify/${verificationCode}>here</a> to verify your account</p>
    `;

  return html;
};

const generateCode = () => {
  return (Math.random() * 10).toString().replace(".", "");
};

export { generateCode, setEmailContent };
