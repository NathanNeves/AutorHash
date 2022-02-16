import request from './Request';
import axios from 'axios';
import AutToken from './AutToken.json'


const BN = require('bn.js');
const web3 = require('web3');
const Contract = require('web3-eth-contract');

export default class Store{
    

    static comprarCoin = async (valor) => {

        let publicAddress = await localStorage.getItem("publicAddressUser");

        console.log(valor)

        let a = new BN(valor*10000, 10);
        let b = new BN(10, 10);
        let c = new BN(11, 10);
        let d = b.pow(c)
        a = a.mul(d)

        console.log(a.toString(16))
        
        try{
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: publicAddress,
                to: '0xE39082F1C4DB7Deaa9093ef4c22D7A9327F72a9b',
                value: a.toString(16),
                gasPrice: '',
                gas: '',
              },
            ],
        })
        .then(async (txHash) => {
                console.log(txHash)
                let res = await request.postRequest("/buy",{"transactionHash": txHash})
                if(res.status != 200){
                    return {"status":res.status, "error": res.body.error};
                }
                let res1 = await request.getRequest("/getSaldo");
                localStorage.setItem("saldo",res1.data.balance)

                return {"status":res.status, "mensagem": res.body.mensagem};
            })
        .catch((error) => console.error);
        }catch(e){
            console.log(e)
        }
    }

    static anunciar = async (valor, obra) =>{
        try {
            //let contract = await new web3.eth.Contract(abi,"0x18b9c5861536f82fd8f9D20526b858b8Af411ca8");
            let account = localStorage.getItem("publicAddressUser");
            //let transaction = await contract.methods.transferFrom(account, "0xE39082F1C4DB7Deaa9093ef4c22D7A9327F72a9b", obra.id).send({from:account,gas:200000})

            console.log(obra)

            Contract.setProvider('http://localhost:7545');

            let contract = new Contract(AutToken.abi, "0x18b9c5861536f82fd8f9D20526b858b8Af411ca8");

            let transaction = await contract.methods.safeTransferFrom(account, "0xE39082F1C4DB7Deaa9093ef4c22D7A9327F72a9b" , obra).send({from: account})

            let body = {
                "valor": valor,
                "nftId": obra,
                "transactionHash": transaction.transactionHash
            }

            let response = await request.postRequest("/criarAnuncio", body)
            return response;
        } catch (error) {
            console.log(error)
            return null;
        }
       
    }
}