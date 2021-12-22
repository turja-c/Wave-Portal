pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    
    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }

    uint256 totalWaves;

    event newWave(address indexed from, uint256 timestamp, string message);

    Wave[] waves;
    
    constructor() {
        console.log("first smart contract!!! ");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit newWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return waves.length;
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
}