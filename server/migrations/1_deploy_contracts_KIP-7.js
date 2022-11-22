const Migrations = artifacts.require("KIP7Token");

module.exports = function(deployer) {
  deployer.deploy(Migrations, 'Klay Crazy Token', 'KCT', 18, 5999000000000000);
};