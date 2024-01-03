import axios from 'axios';

const artworksAPI = axios.create({
    baseURL: 'https://api.artic.edu/api/v1/artworks'
});

export default artworksAPI;