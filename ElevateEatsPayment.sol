// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElevateEatsPayment {
    address public owner;

    // Event to log payments
    event PaymentReceived(address indexed from, uint256 amount);

    // Set the contract owner
    constructor() {
        owner = msg.sender;  // The account deploying the contract is the owner
    }

    // Function to receive payments (ETH)
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);  // Emit event on payment
    }

    // Function to allow the owner to withdraw funds
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Function to get the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
