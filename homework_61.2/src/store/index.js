import { createStore } from 'vuex';

import { ABI } from '@/contracts/Example.abi.js';
import { bytecode } from '@/contracts/Example.bin.js';

const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(':https//eth-goerli.g.alchemy.com/v2/XdE1v9zVDSoRe6S5013cteykw1ZDC0u9');


export default createStore({
    state: {
        provider: {},
        web3Wallet: {},
        wallet: {
            address: "",
            chainId: "",
            chain: "",
        },
        contractAddress: "",
    },
    getters: {
    },
    mutations: {
        addBlock(state, newBlock) {
            state.blocks.unshift(newBlock)
        }
    },
    actions: {
        async getBlock({ commit }, blockNumberOrHash) {
            if(!ethers.utils.isBytesLike(blockNumberOrHash)){
                blockNumberOrHash = Number(blockNumberOrHash)
            }
            return await provider.getBlock(blockNumberOrHash)
        },
        async getTx({ commit }, txHash) {
            console.log(txHash);
            return await provider.getTransaction(txHash)
        },
        async connectionWallet({ state }) {
            if (typeof window.ethereum !== 'undefined') {
                console.log("Ethereum client installed!")
                if (ethereum.isMetaMask === true) {
                    console.log("Metamask installed!")
                    if (ethereum.isMetaMask !== true) {
                        console.log("Metamask is not installed!")
                        await ethereum.enable()
                    } 
                    console.log("Metamask connected!")
                }
                else{
                    alert("Metamask is not installed!")
                }
            } 
            else {
                alert("Ethereum client is not installed!")
            }
            // подключение аккаунта
            await ethereum.request({ method: "eth_requestAccounts" })
            .then(accounts => {
                state.wallet.address = accounts[0]
                console.log(`Account ${state.wallet.address} connected`)
            })
            // создаем провайдера
            state.provider = new ethers.providers.Web3Provider(ethereum)
            // параметры сети
            let network = await state.provider.getNetwork();
            state.wallet.chainId = network.chainId;
            state.wallet.chain = network.name;
            // смена аккаунта
            ethereum.on('accountsChanged', (accounts) => {
                state.wallet.address = accounts[0]
                console.log(`accounts changed to ${state.wallet.address}`);
            }) 
            // смена сети
            ethereum.on('chainChanged', async (chainId) => {
                // создаем провайдера
                state.provider = new ethers.providers.Web3Provider(ethereum)
                // параметры сети
                let network = await state.provider.getNetwork();
                state.wallet.chainId = network.chainId;
                state.wallet.chain = network.name;
                console.log(`chainId changed to ${state.wallet.chainId}`);
                console.log(`chain changed to ${state.wallet.chain}`);
            })
        },
        // отправка транзакции
        async sendTransaction({ state }, arg) {
            let [to, value] = arg;
            console.log(value);
            value = ethers.BigNumber.from(value);
            value = value.toHexString();
            console.log(value);

            await ethereum.request({
                method: "eth_sendTransaction", 
                params: [{
                    from: state.wallet.address,
                    to: to,
                    value: value,
                }] 
            })
            .then(hash => {
                console.log(`Tx hash: ${hash}`)
            })
        },
        async deployContract({ state }) {
            await ethereum.request({
                method: "eth_sendTransaction", 
                params: [{
                    from: state.wallet.address,
                    data: bytecode
                }] 
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async setNumber({ state }, args ){
            let [contractAddress, _number] = args;
            let iface = new ethers.utils.Interface(ABI);
            let txData = iface.encodeFunctionData( "setNumber", [_number]);
        
            ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.wallet.address,
                    to: contractAddress,
                    data: txData
                }]
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async setStr({ state }, args ){
            let [contractAddress, _str] = args;
            let iface = new ethers.utils.Interface(ABI);
            let txData = iface.encodeFunctionData( "setStr", [_str]);
        
            ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.wallet.address,
                    to: contractAddress,
                    data: txData
                }]
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async setData({ state }, args ){
            let [contractAddress, _data] = args;
            let iface = new ethers.utils.Interface(ABI);
            let txData = iface.encodeFunctionData( "setNumber", [_data]);
        
            ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.wallet.address,
                    to: contractAddress,
                    data: txData
                }]
            })
            .then(hash => {
                console.log(`Tx hash ${hash}`)
            })
        },
        async getNumber({ state }, contractAddress) {
            let myContract = new ethers.Contract(contractAddress, ABI, provider);
            let result = await myContract.getNumber();
            return result;
        },
        async getStr({ state }, contractAddress) {
            let myContract = new ethers.Contract(contractAddress, ABI, provider);
            let result = await myContract.getStr();
            return result;
        },
        async getData({ state }, contractAddress) {
            let myContract = new ethers.Contract(contractAddress, ABI, provider);
            let result = await myContract.getData();
            return result;
        }
    },
    modules: {
    }
})
