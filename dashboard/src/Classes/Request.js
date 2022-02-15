import axios from './Axios';
import user from './Usuario';

import { BrowserRouter as useHistory } from 'react-router-dom'

export default class Request{

    static async postRequest(url, body){
        
        let token = await user.getHeader()
        let res = await axios.post(url, body, token)

       return res;
    }

    static async getRequest(url){

        let token = await user.getHeader()
        let res = await axios.get(url, token)

    return res;
    }

    static toLogin(status){
        const history = useHistory();

        if(status == 403 || status == 401){
            history.push("/login")
            return true
        }
        return false
    }
}