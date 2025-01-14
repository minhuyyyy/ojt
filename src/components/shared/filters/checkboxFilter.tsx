import React, { Fragment } from 'react';

//components
import DesktopFilterDropdown from '@components/modals/DesktopFilterDropdown';
import MobileFilterModal from '@components/modals/MobileFilterModal';

//hooks
import useIsMobile from '@hooks/useIsMobile';

function CheckboxFilter() {
    const isMobile = useIsMobile();

    return (
        <Fragment>
            {isMobile ? <MobileFilterModal /> : <DesktopFilterDropdown />}
        </Fragment>
    );
}

export default CheckboxFilter;
