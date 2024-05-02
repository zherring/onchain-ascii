//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract is Ownable, ERC721Enumerable {
	// State Variables
	string private _baseTokenURI;
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	function mintNFT() public payable {
			// require(msg.value == 0.0026 ether, "Incorrect amount");
			_tokenIds.increment();
			uint256 newTokenId = _tokenIds.current();
			_mint(msg.sender, newTokenId);
	}
	
	constructor(string memory baseURI) ERC721("BURN", "BRN") {
			_baseTokenURI = baseURI;
	}

	// Override the _baseURI function to return the base URI set in the constructor
	function _baseURI() internal view override returns (string memory) {
			return _baseTokenURI;
	}

function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory svg = string(abi.encodePacked(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">',
				// '<style>.rotate { animation: rotation 5s infinite linear; }',
        // '@keyframes rotation { from { transform: rotate(0deg) translate(50px, 50px); }',
        // 'to { transform: rotate(360deg) translate(50px, 50px); } }</style>',
        // '<rect x="-25" y="-25" width="50" height="50" fill="gray" class="rotate"/>',
        '<rect width="100" height="100" fill="blue"/>',
        '<text x="10" y="20" class="small" fill="white">Token #',
        Strings.toString(tokenId),
        '</text>',
				
				'<rect x="25" y="25" width="50" height="50" fill="gray" class="rotate">',
        '<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite"/>',
        '</rect>',
				'</svg>'
    ));

    string memory imageURI = string(abi.encodePacked(
        'data:image/svg+xml;base64,',
        Base64.encode(bytes(svg))
    ));

    string memory json = Base64.encode(bytes(string(abi.encodePacked(
        '{"name": "Token #', 
        Strings.toString(tokenId), 
        '", "description": "A dynamically generated NFT", "image": "', 
        imageURI, 
        '"}'
    ))));

    string memory output = string(abi.encodePacked(
        'data:application/json;base64,', 
        json
    ));

    return output;
}

    // Override _burn to handle token burning
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }
	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
