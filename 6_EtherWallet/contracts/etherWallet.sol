pragma solidity ^0.5.16;

contract EtherWallet{

    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }
    function deposit() payable public {
        //this means you can receive ether with this function
    }
    function send(address payable to, uint amount) public {
        if(msg.sender == owner){
        to.transfer(amount);
        return;
        }
        revert('sender is not allowed');
     
    }
    function balanceOf() public view returns(uint) {
        return address(this).balance;
    }
}