import engineFetcher from "@fetchers/engineFetcher";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const queries = req.query

    const response = await engineFetcher(queries.model?.toString() || '', queries.make?.toString() || '', queries.year?.toString() || '')

    return res.status(200).json({ data: response })
}
