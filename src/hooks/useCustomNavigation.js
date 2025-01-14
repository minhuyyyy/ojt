//hooks
import { useRouter } from 'next/router';

export default function useCustomNavigation() {
    const router = useRouter();

    const navigateToPage = ({ url, query }) => {
        let customUrl = url;

        if (!customUrl) customUrl = getPath('/route', { ...query }, {});

        router.push(customUrl);
    };

    return navigateToPage;
}

const getPath = (pageName, query = {}, options = {}) => {
    return pageName + '/';
};
