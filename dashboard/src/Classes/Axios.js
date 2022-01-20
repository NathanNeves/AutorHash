import axios from 'axios';

export default axios.create({
    baseURL:"http://e6fe-45-163-238-92.ngrok.io/api",
    timeout:10000
})