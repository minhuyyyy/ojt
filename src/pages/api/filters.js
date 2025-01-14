import filters from '@mocks/filters.json';
export default function handler(req, res) {
    setTimeout(() => res.status(200).json(filters), 3000);
}
