# Week2-Tokenized-Votes

## How to prepare for script execution

In .env file there should be two private key like this

```
PRIVATE_KEY=[ PRIVATE KEY PLACEHOLDER ]
PRIVATE_KEY1=[ PRIVATE KEY PLACEHOLDER ]
```

## How to execute the project

```
yarn run ts-node --files ./scripts/operate.ts
```


## Detail Reporting

```
Using address 0xd21b2c4fd19561270bA4333b6A8ae77b31b01E48
Using address 0x07776A30Fec8EdCEB29fbb0453B0ef96c4199392
Wallet balance 0.6927364213639737
Deploying MyToken contract
Awaiting confirmations
MyToken contract deployed completed
Contract deployed at 0x70b6709fD2c46AB75226B740d9cF9C3D368CD34e
========= Details =========
Voting Token  Address -  0x70b6709fD2c46AB75226B740d9cF9C3D368CD34e
Delegate Voting To Address -  0x07776A30Fec8EdCEB29fbb0453B0ef96c4199392
Mint tokens for address 0xd21b2c4fd19561270bA4333b6A8ae77b31b01E48
Mint transacton 0xb7f4a6646aa76d9f40f4c5b2ccc58f6cf89a352f5407c34094dae1eefc0c7b54
Delegate vote from 0xd21b2c4fd19561270bA4333b6A8ae77b31b01E48 To 0x07776A30Fec8EdCEB29fbb0453B0ef96c4199392
Delegate transaction 0x0f58fe70f0d170f1e9a88d6a161fa4d9cb1a6f6384743d1a143d2c5a8358b89f
Proposals:
Proposal N. 1: Allen
Proposal N. 2: russ
Proposal N. 3: Kuro
Proposal N. 4: IKA
Proposal N. 5: Sharan
Wallet balance 0.6862641358292619
Awaiting confirmations
Completed
Contract deployed at 0x4a24FAFC9Ee9DBE692A97574394d2500b357bc6e
Voting Power before
100.0
Vote to first proposal with 1 Token 0x0e7cde52b43cabcfb8105d279d3305c1c3a93074fef8fdf57f1d7bc0aed78bcd
Voting Power After
99.0
The winning proposal is: russ
The winning proposal count: 1000000000000000000
```