const { Bot } = require("./app/bot");
const config = require("./config");

(async () => {
  const bot = new Bot(config.telegramToken, config.groupId);

  bot.init();
})();
