const Multideed = artifacts.require("Multideed");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Multideed, accounts[0], accounts[1], 10, {value: 100});
};//these values are the elements of the consturctor;
 