// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Anchor {
    event Anchored(bytes32 indexed anchorHash, address indexed by, uint256 at);

    function anchor(bytes32 _hash) public returns (bool) {
        emit Anchored(_hash, msg.sender, block.timestamp);
        return true;
    }
}
