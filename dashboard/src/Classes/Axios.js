import axios from 'axios';

export default axios.create({
    baseURL:"https://15c9-45-163-236-187.ngrok.io/api",
    timeout:10000
})


//baseURL:"http:localhost:3000",