var CustomVerifier = artifacts.require("./CustomVerifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
  deployer.deploy(CustomVerifier).then(() => {
      deployer.deploy(SolnSquareVerifier,CustomVerifier.address);
  }); 
};

