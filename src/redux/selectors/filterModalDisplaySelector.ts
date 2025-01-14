//duck
import duckCreator from "@ducks/duckCreator";

//redux
import { useSelector } from "react-redux";

const getShowMobileFilterModal = () => {
    const { showMobileFilterModal }: { showMobileFilterModal: boolean } =
        useSelector(duckCreator.selectors.openMobileFilterModal);
    return showMobileFilterModal
}

export default getShowMobileFilterModal