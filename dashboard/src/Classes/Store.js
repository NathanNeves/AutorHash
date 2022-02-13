import request from './Request';
import axios from 'axios';

export default class Store{

    static comprarCoin = (publicAddress) => {
        ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: publicAddress,
                to: '0xE39082F1C4DB7Deaa9093ef4c22D7A9327F72a9b',
                value: '',
                gasPrice: '',
                gas: '',
              },
            ],
        })
        .then(async (txHash) => {
                res = await request.postRequest("/buy",{"transactionHash": txHash})
                if(res.status != 200){
                    return {"status":res.status, "error": res.body.error};
                }
                return {"status":res.status, "mensagem": res.body.mensagem};
            })
        .catch((error) => {console.error; return;});
    }
}