//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract LockEth {
  constructor() {

  }

  struct locked{
      uint256 expireBlock;
      uint256 amount;
  }

  mapping(address => locked) users;

  event Deposit(address sender, uint amount, uint count);   
  event Withdraw(address receiver, uint amount);

  function deposit(uint256 blocks) public payable {
    require(blocks > 0);
    require(msg.value > 0);
    locked storage userInfo = users[msg.sender];
    userInfo.expireBlock = block.number + blocks;
    userInfo.amount = msg.value;

    emit Deposit(msg.sender, msg.value, blocks);
  }

  function withdraw(address to) public {
      require(block.number >= users[msg.sender].expireBlock);
      locked storage userInfo = users[msg.sender];
      uint256 value = userInfo.amount;
      userInfo.expireBlock = 0;
      userInfo.amount = 0;
      payable(to).transfer(value);

      emit Withdraw(to, value);
  }
}