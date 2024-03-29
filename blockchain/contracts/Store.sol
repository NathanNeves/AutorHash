pragma solidity >= 0.7.0 < 0.9.0;
import './Token.sol';
contract Store{
    address public minter;
    Token public token;
    uint256 public tokenPrice;
    event Bought( address indexed sender ,uint256 amount);
    event Sold( address indexed sender,uint256 amount);
    constructor(){
        token = new Token();
        minter = msg.sender;
    }


    function _setTokenPrice(uint256 price) public returns(uint256 newprice){
        require(minter == msg.sender);
        tokenPrice = price;
        return tokenPrice;
    }

    function buy() payable public{
        uint256 amountToBuy = msg.value/tokenPrice;
        uint256 balance = token.balanceOf(address(this));
        require(amountToBuy > 0, "Voce precisa enviar algum bnb");
        require(amountToBuy <= balance, 'Balanco nao funciona');
        token.transfer(msg.sender,amountToBuy);
        emit Bought(msg.sender,amountToBuy);
    }

    function sell(uint256 amount) public{
        require(amount > 0, "Voce precisa vender pelo menos alguns tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(msg.sender,amount);
    }

}