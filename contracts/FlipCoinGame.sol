// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FlipCoinGame {
  address public owner;
  address public player1;
  address public player2;
  uint256 public betAmount;
  bool public gameFinished;
  address public winner;

  enum CoinSide {
    HEADS,
    TAILS
  }
  CoinSide public coinResult;

  event GameStarted(address player1, address player2, uint256 betAmount);
  event CoinFlipped(address indexed player, CoinSide side);
  event GameFinished(address indexed winner, uint256 prize);

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  modifier onlyPlayers() {
    require(
      msg.sender == player1 || msg.sender == player2,
      "Only players can call this function"
    );
    _;
  }

  modifier gameNotFinished() {
    require(!gameFinished, "The game has already finished");
    _;
  }

  function joinGame() external payable gameNotFinished {
    require(msg.value > 0, "You must send a positive bet amount");
    require(player1 == address(0) || player2 == address(0), "The game is full");

    if (player1 == address(0)) {
      player1 = msg.sender;
    } else {
      player2 = msg.sender;
      // The game is full, start the game.
      startGame();
    }

    betAmount = msg.value;
    emit GameStarted(player1, player2, betAmount);
  }

  function flipCoin(CoinSide side) external onlyPlayers gameNotFinished {
    require(
      msg.sender == player1 || msg.sender == player2,
      "Only players can call this function"
    );

    // Simulate a coin flip by using the block timestamp.
    uint256 seed = block.timestamp + uint256(msg.sender);
    CoinSide actualResult = CoinSide(seed % 2);

    if (side == actualResult) {
      // Player wins!
      winner = msg.sender;
      gameFinished = true;
      emit GameFinished(winner, address(this).balance);
    }

    coinResult = actualResult;
    emit CoinFlipped(msg.sender, actualResult);
  }

  function withdraw() external onlyOwner {
    require(gameFinished, "The game is not finished yet");
    require(msg.sender == winner, "Only the winner can withdraw");

    uint256 prize = address(this).balance;
    winner = address(0);
    payable(msg.sender).transfer(prize);
  }

  function cancelGame() external onlyOwner gameNotFinished {
    address payable refundAddress;
    if (player1 != address(0) && player2 == address(0)) {
      refundAddress = payable(player1);
    } else if (player1 == address(0) && player2 != address(0)) {
      refundAddress = payable(player2);
    } else {
      // Both players joined, but the game hasn't started yet.
      refundAddress = payable(player1);
    }

    gameFinished = true;
    refundAddress.transfer(address(this).balance);
  }
}
