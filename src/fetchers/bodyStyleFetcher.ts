import { axiosInstance } from "./axiosInstance"

const bodyStyleFetcher = async (modelName: string, make: string, year: string) => {
    const res = await axiosInstance.get(`/bodies?verbose=yes`, { params: { model: modelName, make: make, year: year || '2019' } })

    return res.data
}
export default bodyStyleFetcher