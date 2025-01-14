import { axiosInstance } from "./axiosInstance";

export default async function carsFetcher(make: string, model: string, year: string) {


    const res = await axiosInstance.get(`/models?sort=asc`, { params: { make: make, model: model, year: year || '2019' } }
    );

    return res.data;
}

export async function trimsFetcher(make: string, model: string, year: string) {

    const res = await axiosInstance.get(`/trims?verbose=yes`, { params: { make: make, model: model, year: year || '2019' } });


    return res;

} 