import axios from "axios";
import localInstance from "./localInstance";

export default async function filtersFetcher() {
    const results = await localInstance.get('/filters')

    return results || {};
}