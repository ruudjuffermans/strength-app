import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://docker01:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;
