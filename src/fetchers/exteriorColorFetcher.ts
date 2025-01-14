import { axiosInstance } from "./axiosInstance"

const exteriorColorFetcher = async (modelName: string, make: string, year: string) => {
    const res = await axiosInstance.get(`/exterior-colors?verbose=yes`, { params: { model: modelName, make: make, year: year || '2019' } })

    return res.data
}

export default exteriorColorFetcher