const userModel = require("../models/User");

async function fetchUserFromUID(uid) {
  return userModel.findOne({
    uid
  });
}

module.exports = {
  fetchUserFromUID
}