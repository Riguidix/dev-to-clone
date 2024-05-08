const axios = 'axios';

export default class Api {
    constructor (token) {
        this.baseUrl = 'http://localhost:3000/api/';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async login (user) {
        const { data } = await axios.post(`${this.baseUrl}/users/login`, user);
        localStorage.setItem('token', data.token);
        
        return data;
    }

    async getUser (user_id) {
        const { data } = await axios.get(`${this.baseUrl}/users/${user_id}`);
        return data;
    }
}

