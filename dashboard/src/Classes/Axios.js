import axios from 'axios';

export default axios.create({
    baseURL:"https://f04f-45-163-236-161.ngrok.io/api",
    timeout:10000
})


//baseURL:"http:localhost:3000",