pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";

//interface for verifier contract
contract CustomVerifier is Verifier{

}

contract SolnSquareVerifier is CustomERC721Token{

    CustomVerifier private verifierContract;

    constructor(address verifierAddress) CustomERC721Token() public{
        verifierContract = CustomVerifier(verifierAddress);
    }

    struct Solutions{
        uint256 tokenId;
        address toAddress;
    }

    Solutions[] private solutions;
    mapping (bytes32 => Solutions) private uniqueSolutions;

    event SolutionAdded(address to, uint256 tokenId);

    function addSolution(address _to, uint256 _tokenId, bytes32 _key) internal {
        Solutions memory _solution = Solutions({tokenId : _tokenId, toAddress : _to});
        solutions.push(_solution);
        uniqueSolutions[_key] = _solution;
        emit SolutionAdded(_to, _tokenId);
    }

    function mintToken(
        address _to,
        uint256 _tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].toAddress == address(0), "Solution is already used.");
        require(verifierContract.verifyTx(a, b, c, input), "Solution verification failed.");

        addSolution(_to, _tokenId, key);
        super.mint(_to, _tokenId);
    }

}















