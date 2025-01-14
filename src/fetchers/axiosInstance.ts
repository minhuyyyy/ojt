import axios from 'axios';

const baseUrl = 'https://carapi.app/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,

});

// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`


axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        }
        else if (response.status === 401) {
            console.error('Unauthorized', response.data);
        }
    },
    (error) => {

        // console.error('Error in fetching dat a', error);
        return {};
    },
);
