const nodeConfig = require("config");

const config = {
  telegramToken: nodeConfig.get("telegramToken"),
  groupId: parseInt(nodeConfig.get("groupId")),
  server: nodeConfig.get("server"),
};

module.exports = config;
