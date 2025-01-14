import { Make } from "@contracts/index"
import { Car } from "@contracts/types/car"
import duckCreator from "@ducks/duckCreator"
import seedingData from "@utils/seedingData"
import { useSelector } from "react-redux"

const getCars = () => {
    const { cars }: { cars: Car[] } = useSelector(duckCreator.selectors.getAllCars)
    return cars
}

export default getCars