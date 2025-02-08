import axios from 'axios';
import { BASE_FETCH_URL } from './config.js';
axios.defaults.baseURL = BASE_FETCH_URL;
export const fetchComments = async(videoId, setComments) => {
    try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
    } catch (err) {}
};