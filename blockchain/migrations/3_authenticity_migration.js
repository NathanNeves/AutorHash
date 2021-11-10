const Authenticity = artifacts.require("AutToken");

module.exports = function (deployer) {
  deployer.deploy(Authenticity);
};
