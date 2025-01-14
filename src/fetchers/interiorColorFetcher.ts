import { axiosInstance } from "./axiosInstance"

const interiorColorFetcher = async (modelName: string | null, make: string | null, year: string) => {
    const res = await axiosInstance.get(`/interior-colors?verbose=yes`, { params: { model: modelName, make: make, year: year || '2019' } })
    return res.data
}

export default interiorColorFetcher