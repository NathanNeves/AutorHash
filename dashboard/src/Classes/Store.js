import request from './Request';
import axios from 'axios';

const BN = require('bn.js');

export default class Store{

    static comprarCoin = async (valor) => {

        var a = new BN(valor, 10);
        
        let publicAddress = localStorage.getItem("publicAddressUser")
        console.log("comprandedao mos")
        try{
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: publicAddress,
                to: '0xE39082F1C4DB7Deaa9093ef4c22D7A9327F72a9b',
                value: valor.toString(16),
                gasPrice: '',
                gas: '',
              },
            ],
        })
        .then(async (txHash) => {
                console.log("dale")
                let res = await request.postRequest("/buy",{"transactionHash": txHash})
                if(res.status != 200){
                    return {"status":res.status, "error": res.body.error};
                }
                return {"status":res.status, "mensagem": res.body.mensagem};
            })
        .catch((error) => console.error);
        }catch(e){
            console.log(e)
        }
    }
}