import axios from 'axios';

export default axios.create({
    baseURL:"http://localhost:8000/api",
    timeout:1000000
})


//baseURL:"http:localhost:3000",