import axios from 'axios';

export default axios.create({
    baseURL:"https://ff15-45-163-236-161.ngrok.io/api",
    timeout:10000
})


//baseURL:"http:localhost:3000",