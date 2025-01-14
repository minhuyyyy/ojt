import interiorColorFetcher from "@fetchers/interiorColorFetcher";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queries = req.query

    const response = await interiorColorFetcher(queries.model?.toString() || '', queries.make?.toString() || '', queries.year?.toString() || '')
    return res.status(200).json({ data: response })
}
