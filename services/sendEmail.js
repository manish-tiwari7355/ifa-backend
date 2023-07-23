const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey, region, sesSenderAddress } =
  require("../config/keys").aws;
const axios = require("axios");
const fs = require("fs");
const SES_CONFIG = {
  accessKeyId,
  secretAccessKey,
  region,
};
const mimemessage = require("mimemessage");
const ses = new AWS.SES(SES_CONFIG);
/**
 * Sends email address
 * @param {Array} recipients - Array of recipient email addresses
 * @param {String} subject - Subject line of the email
 * @param {String} template - Email body in html with inline styles
 */
const sendEmail = (recipients, subject, template, fileName, type) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: "get",
        url: `${fileName}`,
        responseType: "arraybuffer",
      })
        .then((response) => {
          console.log(response);
          var data = new Buffer.from(response.data, "binary");
          var alternateEntity = mimemessage.factory({
            contentType: `${type}`,
            contentTransferEncoding: "base64",
            body: data.toString("base64").replace(/([^**\0**]{76})/g, "$1\n"),
          });

          alternateEntity.header(
            "Content-Disposition",
            'attachment; filename="File"'
          );
          var htmlEntity = mimemessage.factory({
            contentType: "text/html;charset=utf-8",
            body: template,
          });
          const message = mimemessage.factory({
            contentType: "multipart/mixed",
            body: [htmlEntity, alternateEntity],
          });

          message.header("to", "chairmanifa@gmail.com");
          message.header("from", "chairmanifa@gmail.com");
          message.header("bcc", "chairmanifa@gmail.com");

          message.header("subject", `${subject}`);

          const rawEmail = message.toString();

          const params = {
            RawMessage: {
              Data: rawEmail,
            },
            Destinations: [
              "areeb.safvi@simbaquartz.com",
              "chairmanifa@gmail.com",
              "amisha.sharma@simbaquartz.com",
            ],
            Source: "chairmanifa@gmail.com",
          };

          const sendEmail = async () =>
            await ses.sendRawEmail(params).promise();
          sendEmail();
          resolve();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      return reject(error);
    }
  });
};
const sendEmail2 = (recipients, subject, template) => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Destination: {
          ToAddresses: recipients, // Email address/addresses that you want to send your email
          BccAddresses: [
            "areeb.safvi@simbaquartz.com",
            "chairmanifa@gmail.com",
            "amisha.sharma@simbaquartz.com",
          ],
        },
        Message: {
          Body: {
            Html: {
              // HTML Format of the email
              Charset: "UTF-8",
              Data: template,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        Source: "chairmanifa@gmail.com",
      };
      const sendEmail = async () => await ses.sendEmail(params).promise();
      sendEmail();
      resolve();
    } catch (error) {
      return reject(error);
    }
  });
};
const generateOTP = () => {
  var digits = "0123456789";
  var otpLength = 4;
  var otp = "";
  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
};

module.exports = { sendEmail, generateOTP, sendEmail2 };
