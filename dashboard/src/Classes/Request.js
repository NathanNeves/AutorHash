import axios from './Axios';
import user from './Usuario';

import { BrowserRouter as useHistory } from 'react-router-dom'

export default class Request{

    async postRequest(url, body){
       res = await axios.post(url, body, user.getHeader)

       if(this.toLogin(res.status)){
            return;
       }

       return res;
    }

    async getRequest(url, body){
        res = await axios.get(url, body, user.getHeader)

        if(this.toLogin(res.status)){
            return;
        }

    return res;
    }

    toLogin(status){
        const history = useHistory();

        if(status == 403 || status == 401){
            history.push("/login")
            return true
        }
        return false
    }
}