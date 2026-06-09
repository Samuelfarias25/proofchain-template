// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofChainNFT is ERC721, Ownable {

    uint256 public nextTokenId;

    struct Work {
        string title;
        string category;
        string ipfsHash;
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => Work) public works;

    constructor() ERC721("ProofChain", "PCHAIN") {}

    function registerWork(
        address to,
        string memory title,
        string memory category,
        string memory ipfsHash
    ) public returns (uint256) {

        uint256 tokenId = nextTokenId;

        _safeMint(to, tokenId);

        works[tokenId] = Work({
            title: title,
            category: category,
            ipfsHash: ipfsHash,
            creator: to,
            timestamp: block.timestamp
        });

        nextTokenId++;

        return tokenId;
    }
}