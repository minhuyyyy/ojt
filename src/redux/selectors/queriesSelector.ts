//duck
import duckCreator from "@ducks/duckCreator";

//redux
import { useSelector } from "react-redux";

const getQueries = () => {
    const { query }: { query: object } = useSelector(duckCreator.selectors.getQuery)
    return query
}