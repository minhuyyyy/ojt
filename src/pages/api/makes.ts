import makesFetcher from '@fetchers/makesFetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await makesFetcher()


    return res.status(200).json({ data: response.data })
}
