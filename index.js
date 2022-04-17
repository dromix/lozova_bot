const { Bot } = require("./src/app/bot");
const config = require("./src/config");

(async () => {
  const bot = new Bot(config.telegramToken, config.groupId);

  bot.init();
})();
