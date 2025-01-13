// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    event TokensMinted(address indexed to, uint256 amount);  // NEW EVENT

    constructor() ERC20("MyToken", "MTK") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);  // Emit event after minting
    }
}
