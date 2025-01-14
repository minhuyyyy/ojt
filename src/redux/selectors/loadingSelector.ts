//duck
import duckCreator from "@ducks/duckCreator"

//redux
import { useSelector } from "react-redux"

const getLoading = () => {
    const { loading }: { loading: boolean } = useSelector(duckCreator.selectors.getLoading)
    return loading
}

export default getLoading