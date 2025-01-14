import { axiosInstance } from "./axiosInstance";

export default async function makesFetcher() {
    const data = await axiosInstance.get('/makes');
    return data || {};

}