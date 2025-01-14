//duck
import duckCreator from "@ducks/duckCreator";

//redux
import { useSelector } from "react-redux";

const getShowMobile = () => {
    const { showMobile }: { showMobile: boolean } = useSelector(
        duckCreator.selectors.returnIsMobile,
    );
    return showMobile
}

export default getShowMobile