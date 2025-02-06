import axios from 'axios';
axios.defaults.baseURL = 'http://adriandeharo.es:8001/api';
export const fetchComments = async(videoId, setComments) => {
    try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
    } catch (err) {}
};