const nodeConfig = require("config");

const config = {
  telegramToken: nodeConfig.get("telegramToken"),
  groupId: parseInt(nodeConfig.get("groupId")),
};

module.exports = config;
