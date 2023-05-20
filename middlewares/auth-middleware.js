const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const TokenRepository = require("../repositories/tokens.repository");

const tokenRepository = new TokenRepository();

module.exports = async (req, res, next) => {

};
