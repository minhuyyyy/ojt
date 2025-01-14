import carsFetcher from '@fetchers/carsFetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queries = req.query

    const response = await carsFetcher(queries.make?.toString() || '', queries.model?.toString() || '', queries.year?.toString() || '')


    return res.status(200).json({ data: response })
}
