import { axiosInstance } from "./axiosInstance"

const engineFetcher = async (modelName: string, make: string, year: string) => {
    const res = await axiosInstance.get(`engines?verbose=yes`, { params: { model: modelName, make: make, year: year || '2019' } })
    return res.data
}

export default engineFetcher