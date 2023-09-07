// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtherWallet {
  address payable public owner;

  constructor() {
    owner = payable(msg.sender);
  }

  receive() external payable {
    (bool isSuccess, bytes memory data) = _to.call{value: msg.value}("");
    require(isSuccess, "Failed to send Ether");
  }

  function withdraw(uint _amount) external {
    require(msg.sender == owner, "caller is not owner");
    payable(msg.sender).transfer(_amount);
  }

  function getBalance() external view returns (uint) {
    return address(this).balance;
  }
}
