//duck
import duckCreator from "@ducks/duckCreator";

//redux
import { useSelector } from "react-redux";

const getExteriorColors = () => {
    const { exteriorColors }: { exteriorColors: string[] } = useSelector(
        duckCreator.selectors.getAllExteriorColors,
    );
    return exteriorColors
}

export default getExteriorColors