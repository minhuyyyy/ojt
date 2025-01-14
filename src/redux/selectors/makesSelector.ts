//type
import { Make } from "@contracts/types/make"

//duck
import duckCreator from "@ducks/duckCreator"

//redux
import { useSelector } from "react-redux"

const getMakes = () => {
    const { makes }: { makes: Make[] } = useSelector(duckCreator.selectors.getAllMakes)
    return makes
}

export default getMakes