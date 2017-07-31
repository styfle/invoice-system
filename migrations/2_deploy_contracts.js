// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var InvoiceContract = artifacts.require("./InvoiceContract.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
  deployer.deploy(InvoiceContract, "0xf58a624177d513fe8bd367b1a5f7ec7d0a32abfd");
};
