import exteriorColorFetcher from "@fetchers/exteriorColorFetcher";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queries = req.query

    const response = await exteriorColorFetcher(queries.model?.toString() || '', queries.make?.toString() || '', queries.year?.toString() || '')

    return res.status(200).json({ data: response })
}
