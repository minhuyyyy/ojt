// helpers
import { mapDuckEggsToPage } from '@helpers/mapDuckEggsToPage';

// ducks
import duckCreator from '@ducks/duckCreator';

// hooks
import useCustomNavigation from '@hooks/useCustomNavigation';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

//components
import CheckboxFilter from '@components/shared/filters/checkboxFilter';
import CarHolder from '@components/shared/carHolder/carHolder';

//utils
import { getMakeCarsNumber } from '@utils/carUtils';
import fetchCarsFromQuery from '@utils/filterUtils/fetchCarsFromQuery';
import filterDataWithQuery from '@utils/filterUtils/filterDataWithQuery';
import { getFilters } from '@redux/selectors';

const SearchCarResults = ({ title, slugging }) => {
    const { query } = useRouter();
    const navigateToPage = useCustomNavigation();
    const dispatch = useDispatch();

    const { make, model, body } = query;

    const handleClick = () => {
        navigateToPage({ query: '123' });
    };
    const filters = getFilters();

    useEffect(() => {
        (async () => {
            try {
                dispatch(duckCreator.creators.setLoading(true));
                const data = await fetchCarsFromQuery(
                    model?.toString() || '',
                    make?.toString() || '',
                );

                const makes = getMakeCarsNumber(data.makes, data.models);

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'makes',
                        data: makes,
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'cars',
                        data: data.makeModels,
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'exteriorColors',
                        data: data.colors,
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        key: 'interiorColors',
                        data: data.intColors,
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        data: data.engines,
                        key: 'enginesType',
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        data: data.bodies,
                        key: 'bodiesType',
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        data: data.cylinders,
                        key: 'cylinders',
                    }),
                );

                const filteredCars = filterDataWithQuery(
                    data.cars,
                    query,
                    filters,
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'filteredCars',
                        data: filteredCars,
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'trims',
                        data: data.trims,
                    }),
                );
            } catch (error) {
                console.error(error);
            }
        })();
    }, [query]);

    return (
        <div className='flex flex-col items-start w-full'>
            <div className='grid lg:grid-cols-12 gap-x-4 gap-y-2 w-full'>
                <div
                    suppressHydrationWarning
                    className=' lg:col-span-3 relative items-start border-2 border-gray-200 rounded-md h-fit overflow-y-scroll'
                >
                    <CheckboxFilter />
                </div>
                <div className='col-span-12 lg:col-span-9 w-full flex flex-col gap-4'>
                    <CarHolder />
                </div>
            </div>
        </div>
    );
};

SearchCarResults.getInitialProps = async (context) => {
    const { store, query } = context;
    const { make, model } = query;
    console.log('Fetching data with query:', query);

    try {
        // Fetch data
        const data = await fetchCarsFromQuery(
            model?.toString() || '',
            make?.toString() || '',
        );

        console.log('Data fetched:', data);

        const makes = getMakeCarsNumber(data.makes, data.models);

        // Dispatch actions to the store
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'makes',
                data: makes,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'cars',
                data: data.makeModels,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'exteriorColors',
                data: data.colors,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'interiorColors',
                data: data.intColors,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'enginesType',
                data: data.engines,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'bodiesType',
                data: data.bodies,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'cylinders',
                data: data.cylinders,
            }),
        );

        const filteredCars = filterDataWithQuery(data.cars, query);

        store.dispatch(
            duckCreator.creators.updateState({
                key: 'filteredCars',
                data: filteredCars,
            }),
        );
        store.dispatch(
            duckCreator.creators.updateState({
                key: 'trims',
                data: data.trims,
            }),
        );
    } catch (error) {
        console.log('Error fetching data:', error);
    }

    return {
        title: 'SearchCarResults',
    };
};

const { WrappedPage } = mapDuckEggsToPage(SearchCarResults, {
    // Only add reducers which are only used in this PageComponent
    // exampleDuckCreator had called API and wrapped as a global reducer
    reducers: [],
});

export default WrappedPage;
