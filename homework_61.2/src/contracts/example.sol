// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Example {

    uint256 number;
    string str;
    uint256[] data;

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function setStr(string calldata _str) public {
        str = _str;
    }

    function setData(uint256 _data) public {
            data.push(_data);
    }

    function getNumber() public view returns(uint256) {
        return number;
    }

    function getStr() public view returns(string memory) {
        return str;
    }

    function getData() public view returns(uint256[] memory) {
        return data;
    }

}