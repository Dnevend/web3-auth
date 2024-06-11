import { ethers } from "ethers";

export const getErc20Interface = () => {

    // ERC-20 代币的转账事件签名
    const transferEventSignature = 'Transfer(address,address,uint256)';

    // ERC-20 代币的 ABI
    const erc20Abi = [
        'function transfer(address to, uint amount) returns (bool)',
        `event ${transferEventSignature}`
    ];

    // 创建一个合约接口
    const erc20Interface = new ethers.Interface(erc20Abi);

    return erc20Interface
}