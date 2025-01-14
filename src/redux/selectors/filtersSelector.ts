//type
import { Filter } from "@contracts/index"

//duck
import duckCreator from "@ducks/duckCreator"

//redux
import { useSelector } from "react-redux"

const getFilters = () => {
    const { filters }: { filters: Filter } = useSelector(duckCreator.selectors.getAllFilters)
    return filters
}
export default getFilters