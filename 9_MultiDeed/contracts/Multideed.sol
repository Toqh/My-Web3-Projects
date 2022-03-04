pragma solidity ^0.5.0;

contract Multideed {
    address public lawyer;
    address payable public beneficiary;
    uint public earliest;
    uint public amount;
    uint constant public PAYOUTS = 4; //this allows us to save gas by storing the variable in the code instead of the storage of the blockchain
    uint constant public INTERVAL = 1;
    uint public paidPayouts;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint fromNow )
        payable 
        public {
        
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = now + fromNow;
        amount = msg.value/ PAYOUTS;
    }
    function withdraw() public {
        require(msg.sender == beneficiary, 'lawyer only');
        require(now >= earliest, 'too early');
        require(paidPayouts < PAYOUTS, 'no payouts left');//number of payouts done
        
        
        uint eligiblePayouts = 1 + (now - earliest) / INTERVAL;
        uint duePayouts = eligiblePayouts - paidPayouts;
        duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;
        paidPayouts += duePayouts;
        beneficiary.transfer(duePayouts * amount);
        

    }
}