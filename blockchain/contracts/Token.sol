pragma solidity >= 0.7.0 < 0.9.0;
import "./IERC20.sol";
contract Token is IERC20{
    uint256 private constant MAX_UINT256 = 2**256 - 1;
    address public minter;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    string  constant name  = "AutorCoin";
    int8 public constant decimals = 10;
    string public symbol;
    uint256 public totalSupply = 10**18 ;

    constructor(){
        minter = msg.sender;
        symbol = "Aut";
    }


    function mint() public returns(bool success){
        require(msg.sender == minter);
        uint256 percentage = totalSupply*20/100;
        require(percentage <= totalSupply);
        totalSupply+= percentage*8;
        return true;

    }
    
    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(balances[msg.sender] >= _value);
        uint256 burn_percentage = _value * 3/100;
        balances[msg.sender] -= _value;
        totalSupply -= burn_percentage;
        _value = _value - burn_percentage;
        balances[_to] += _value ;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        uint256 allowance_ = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance_ >= _value);
        uint256 burn_percentage = _value * 3/100;
        totalSupply -= burn_percentage;
        _value = _value - burn_percentage;
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance_ < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }
    
    
    
    
}