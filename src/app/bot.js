const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const logger = require("../helpers/logger");

class Bot {
  constructor(token, groupId) {
    this.bot = new TelegramBot(token, { polling: true });
    this.token = token;
    this.groupId = groupId;
    this.admins = [];
  }

  async init() {
    logger.info("Start initialization bot");

    this.admins = await this.getGroupAdmins();
    this.bot.onText(/\/start/, this.onStart.bind(this));
    this.bot.on("message", this.onMessage.bind(this));
    this.bot.on("error", this.onError.bind(this));
    this.bot.on("polling_error", this.onPullingError.bind(this));
    console.log("admins", this.admins);
  }

  // Handlers
  onError(error) {
    logger.error(new Error(error));
  }

  onPullingError(error) {
    logger.error(new Error(error));
  }

  onStart(msg) {
    logger.info("onstartmsg", msg);
    const userId = msg.from.id;
    const welcomeMessage = `Привет 🚀
Я админ паблика @xlozovaya
Если у Вас есть новость просто отправь её мне и я как можно скорее опубликую.
Спасибо, что делишься новостями. Мы трудимся для жителей Лозовщины 

Ваша новость останется Анонимной.`;

    this.bot.sendMessage(userId, welcomeMessage);
  }

  onMessage(msg) {
    logger.info(msg);

    if (this.isReplyMessage(msg)) {
      return this.onReplyMessage(msg);
    }

    const messageTemplate = `<a href="tg://user?id=${msg.from.id}">${msg.from.first_name} ${msg.from.last_name} | id:${msg.from.id}</a> \n${msg.text}`;

    this.bot.sendMessage(this.groupId, messageTemplate, {
      parse_mode: "HTML",
    });
  }

  onReplyMessage(msg) {
    const userId = msg.reply_to_message.text
      .match(/id:\d+/gim)[0]
      .split(":")[1];
    //[0].spit(":")[1];

    logger.info(`onReply to user ${userId} with message ${msg.text}`, userId);

    this.bot.sendMessage(userId, msg.text);
  }

  // Validators

  isReplyMessage(msg) {
    const isReplyFromNotificationGroup = msg.chat.id === this.groupId;
    logger.info(`this.groupId ${this.groupId} chat.id ${msg.chat.id}`);
    const isReply = msg.reply_to_message !== undefined;
    const isReplyFromAdmin = this.admins.some(
      (admin) => admin.id === msg.from.id
    );

    logger.info(`isReplyFromNotificationGroup`, isReplyFromNotificationGroup);
    logger.info(`isReply`, isReply);

    return isReply && isReplyFromNotificationGroup && isReplyFromAdmin;
  }

  isNewChatMember(msg) {
    const isNewMember =
      msg.new_chat_member !== undefined ||
      msg.new_chat_participant !== undefined;
  }

  // Helpers

  async getGroupAdmins() {
    const url = `https://api.telegram.org/bot${this.token}/getChatAdministrators?chat_id=${this.groupId}`;

    return axios({ method: "GET", url: url }).then((response) => {
      const admins = response.data.result.map(({ user }) => {
        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
        };
      });
      return admins;
    });
  }
}

module.exports = { Bot };
