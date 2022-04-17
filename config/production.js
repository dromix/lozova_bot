const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  telegramToken: process.env.TELEGRAM_TOKEN,
  groupId: process.env.NOTIFICATION_GROUP_ID,
};
