const service = {};
service.auth = require("./auth.service");
service.club = require("./club.service");
service.comment = require("./comment.service");
service.forum = require("./forum.service");
service.nft = require("./nft.service");
service.post = require("./post.service");
service.user = require("./user.service");

module.exports = service;