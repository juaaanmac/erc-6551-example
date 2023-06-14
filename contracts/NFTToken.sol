// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IERC6551Registry.sol";

contract NFTToken is ERC721, ERC721URIStorage, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    uint256 public constant MAX_TOKENS = 10000;
    address internal constant ERC6551_REGISTRY_ADDRESS =
        0x02101dfB77FDE026414827Fdc604ddAF224F0921;
    address internal constant ERC6551_ACCOUNT_ADDRESS =
        0x2D25602551487C3f3354dD80D76D54383A243358;
    uint256 internal constant CHAIN_ID = 80001;
    Counters.Counter private _tokenIdCounter;

    event NFTMinted(address to, uint256 tokenId, address tba);

    constructor() ERC721("JUAN MACRI", "MAC") {}

    function safeMint(address to, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256 tokenId, address tba)
    {
        tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tba = _createTBA(_tokenIdCounter.current());

        emit NFTMinted(to, tokenId, tba);
        _tokenIdCounter.increment();
    }

    function updateTokenURI(uint256 tokenId, string memory _tokenURI)
        public
        onlyOwner
    {
        _setTokenURI(tokenId, _tokenURI);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _createTBA(uint256 tokenId) internal returns (address) {
        address tba = IERC6551Registry(ERC6551_REGISTRY_ADDRESS).createAccount(
            ERC6551_ACCOUNT_ADDRESS,
            CHAIN_ID,
            address(this),
            tokenId,
            400,
            abi.encodeWithSignature("initialize(bool)", false)
        );
        return tba;
    }
}
