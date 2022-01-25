pragma solidity >= 0.7.0 < 0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AutToken is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public  minter;
    constructor() ERC721("AutToken", "AUTT") public {
        minter = msg.sender;
    }

    

    function authenticateDocument(address tokenOwner, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(tokenOwner, newItemId);
        _setTokenURI(newItemId,tokenURI);
        return newItemId;
    }
    
}