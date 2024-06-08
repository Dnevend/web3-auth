# web3-auth

基于 Express 框架的以太坊登陆 Sign-In with Ethereum(EIP-4361) 标准实现

## Template

```
${scheme}:// ${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
Expiration Time: ${expiration-time}
Not Before: ${not-before}
Request ID: ${request-id}
Resources:
- ${resources[0]}
- ${resources[1]}
...
- ${resources[n]}
```

## Example

```
example.com wants you to sign in with your Ethereum account:
0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

I accept the ExampleOrg Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891756
Issued At: 2021-09-30T16:25:24Z
Resources:
- ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/
- https://example.com/my-web2-claim.json
```

- [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361)
- [详解 EIP-4361：什么是以太坊登录？](https://foresightnews.pro/article/detail/21548)
- [从 EIP4361，探索 Web2 到 Web3 账户体系变革](https://www.chaincatcher.com/article/2090328)
- [「使用以太坊登录」── 颠覆互联网用户的选择](https://www.theblockbeats.info/news/29865)
