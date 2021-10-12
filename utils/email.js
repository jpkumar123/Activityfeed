const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async ({ from, to, subject, text, html }) => {
  const emailmessage = {
    from: from,
    to: to,
    text: text,
    subject: subject,
    html: html,
    // dynamic_template_data: {
    //   RESET_LINK: resetLink,
    // },
  };
  try {
    const mailResponse = await sgMail.send(emailmessage);
    console.log("assuming main is sent");
    console.log(mailResponse);
  } catch (error) {
    console.log(JSON.stringify(error));
    console.log("something wrong", error);
  }
};
