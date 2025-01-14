import React, {
    ChangeEvent,
    Fragment,
    MouseEvent,
    useEffect,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import duckCreator from '@ducks/duckCreator';
import clsx from 'clsx';
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filterComponent';
import { Select, SelectItem } from '@nextui-org/react';
import { Car } from '@contracts/types/car';

// Redux selectors
import { getFilters } from '@redux/selectors';

// Hooks
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

function MobileFilterModal() {
    const dispatch = useDispatch();
    const showMobileFilterModal = useSelector(
        (state) =>
            duckCreator.selectors.openMobileFilterModal(state)
                .showMobileFilterModal,
    );
    const filters = getFilters();
    const router = useRouter();

    const [mileage, setMileage] = useState([0, 0]);
    const [year, setYear] = useState([0, 0]);
    const [selectedCar, setSelectedCar] = useState<Car>({} as Car);
    const [filteredModels, setFilteredModels] = useState<Car[]>([]);

    function pushUrlParams(key: string, value: string | number) {
        const currentQuery = new URLSearchParams(
            router.query as Record<string, string>,
        );

        // Clear 'model' if 'make' is provided
        if (key === 'make') {
            currentQuery.delete('model');
        }

        // Handle appending multiple values for 'body'
        if (key === 'body_type' || key === 'cylinders') {
            const existingValues =
                currentQuery.getAll(key)[0]?.split(',') || []; // Get all current values

            existingValues.push(value.toString()); // Add new value
            currentQuery.delete(key); // Clear all existing values

            existingValues.forEach((val) => {
                currentQuery.append(key, val);
            }); // Append all values
        } else {
            currentQuery.set(key, value.toString()); // Set or replace value for other keys
        }

        router.push(
            {
                pathname: router.pathname,
                query: currentQuery.toString(), // Converts URLSearchParams back to a query string
            },
            undefined,
            { shallow: true },
        );
    }

    const handleDebouncedInputChange = debounce(
        (key: string, value: number) => {
            pushUrlParams(key, value);
        },
        500,
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.currentTarget;
        const splitId = id.split('_');
        const parsedValue = parseInt(value, 10) || 0;

        if (splitId[0] === 'min') {
            if (splitId[1] === 'mileage') {
                setMileage([parsedValue, mileage[1]]);
            } else {
                setYear([parsedValue, year[1]]);
            }
        } else if (splitId[0] === 'max') {
            if (splitId[1] === 'mileage') {
                setMileage([mileage[0], parsedValue]);
            } else {
                setYear([year[0], parsedValue]);
            }
        }

        handleDebouncedInputChange(`${splitId[0]}_${splitId[1]}`, parsedValue);
    };

    const handleCheckboxChange = (
        e: ChangeEvent<HTMLInputElement>,
        name: string,
        item: string,
    ) => {
        const { checked } = e.target;

        if (checked) {
            pushUrlParams(name, item);
        } else {
            removeUrlParamValue(name, item); // Call the function to remove the item
        }
    };

    const removeUrlParamValue = (key, valueToRemove) => {
        const { query } = router;

        if (query[key]) {
            // Ensure the query parameter is treated as an array
            const values = Array.isArray(query[key])
                ? query[key]
                : [query[key]];

            // Filter out the valueToRemove from the array
            const newValues = Array(values).filter(
                (value) => value !== valueToRemove,
            );

            if (newValues.length > 0) {
                // Update the URL with the remaining values
                router.push(
                    {
                        pathname: router.pathname,
                        query: {
                            ...query,
                            [key]: newValues,
                        },
                    },
                    undefined,
                    { shallow: true },
                );
            } else {
                // If no values are left, remove the key from the query
                const { [key]: _, ...restQuery } = query;

                router.push(
                    {
                        pathname: router.pathname,
                        query: restQuery,
                    },
                    undefined,
                    { shallow: true },
                );
            }
        }
    };

    const updateQueryParam = (key, validValues) => {
        const currentValues = Array.isArray(router.query[key])
            ? router.query[key]
            : [router.query[key]];

        Array(currentValues).forEach((value) => {
            // Ensure the value is a string for localeCompare
            const currentValue = typeof value === 'string' ? value : '';
            const normalizedValue =
                key === 'engine_type'
                    ? currentValue.toLowerCase()
                    : currentValue;

            // Check if validValues is an array and contains strings
            const isValid = validValues.some((validValue) => {
                const validStr =
                    typeof validValue === 'string' ? validValue : '';
                return (
                    normalizedValue.localeCompare(validStr, undefined, {
                        sensitivity: 'base',
                    }) === 0
                );
            });

            if (!isValid) {
                removeUrlParamValue(key, value);
            }
        });
    };

    const handleAnchorTagClick = (
        e: MouseEvent<HTMLAnchorElement, MouseEvent>,
        detailsId: string,
    ) => {
        e.preventDefault();
        const details = document.getElementsByTagName('details');
        const selectedDetails = details.namedItem(detailsId);
        if (selectedDetails!.open === true) {
            selectedDetails!.open = false;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        } else {
            selectedDetails!.open = true;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (filters) {
            if (Array.isArray(filters.cylinders)) {
                const validCylinders = filters.cylinders.map(
                    (filter: any) => filter.cylinders,
                );
                updateQueryParam('cylinders', validCylinders);
            }

            if (Array.isArray(filters.enginesType)) {
                const validEngines = filters.enginesType.map(
                    (filter: any) => filter.engine_type,
                );
                updateQueryParam('engine_type', validEngines);
            }

            if (Array.isArray(filters.bodiesType)) {
                const validBodies = filters.bodiesType.map(
                    (filter: any) => filter.type,
                );
                updateQueryParam('body_type', validBodies);
            }
        }
    }, [filters, router.query]);

    useEffect(() => {
        setSelectedCar({
            ...selectedCar,
            make_name: router.query.make?.toString() || '',
            name: router.query.model?.toString() || '',
        });
        setFilteredModels(filters.cars);
        setMileage([
            ...mileage,
            (mileage[0] = Number(router.query.min_mileage) || 0),
            (mileage[1] = Number(router.query.max_mileage) || 0),
        ]);
    }, [router.query, filters]);

    const handleFilterModal = (value) => {
        dispatch(duckCreator.creators.setShowMobileFilterModal(value));
    };

    return (
        <div className='relative'>
            {/* Trigger button */}
            <div
                onClick={() => handleFilterModal(true)}
                className='z-50'
            >
                Filter
            </div>
            {/* Modal */}
            <div
                className={clsx(
                    'fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 z-60',
                    {
                        'translate-x-0': showMobileFilterModal,
                        'translate-x-full': !showMobileFilterModal,
                    },
                )}
            >
                <div className='relative flex flex-col h-full'>
                    {/* Close Button */}
                    <div
                        onClick={() => handleFilterModal(false)}
                        className='absolute top-4 right-4 p-2 cursor-pointer z-70 text-3xl'
                    >
                        &times; {/* You can replace this with an icon */}
                    </div>
                    <div className='flex-grow p-4 mt-20'>
                        {/* Filters */}
                        {filters && (
                            <>
                                <FilterComponent
                                    filterName='Year'
                                    id='year'
                                >
                                    <div className='flex flex-row justify-between'>
                                        <TextInput
                                            inputStyle='w-4/5'
                                            filterName='Min'
                                            id='year_min'
                                            onChange={handleInputChange}
                                            placeholder='Min'
                                            value={
                                                Number(router.query.min_year) ||
                                                year[0] ||
                                                0
                                            }
                                            className=''
                                        />
                                        <TextInput
                                            inputStyle='w-4/5'
                                            filterName='Max'
                                            id='year_max'
                                            onChange={handleInputChange}
                                            placeholder='Max'
                                            value={
                                                Number(router.query.max_year) ||
                                                year[1] ||
                                                0
                                            }
                                        />
                                    </div>
                                </FilterComponent>

                                <FilterComponent
                                    filterName='Mileage'
                                    id='mileage'
                                >
                                    <div className='flex flex-row justify-between'>
                                        <TextInput
                                            inputStyle='w-4/5'
                                            filterName='Min'
                                            id='min_mileage'
                                            onChange={handleInputChange}
                                            placeholder='Min'
                                            value={
                                                Number(
                                                    router.query.min_mileage,
                                                ) ||
                                                mileage[0] ||
                                                0
                                            }
                                        />
                                        <TextInput
                                            inputStyle='w-4/5'
                                            filterName='Max'
                                            id='max_mileage'
                                            onChange={handleInputChange}
                                            placeholder='Max'
                                            value={
                                                Number(
                                                    router.query.max_mileage,
                                                ) ||
                                                mileage[1] ||
                                                0
                                            }
                                        />
                                    </div>
                                </FilterComponent>

                                <FilterComponent
                                    filterName='Cylinders'
                                    id='cylinders'
                                >
                                    {filters.cylinders.map(
                                        (cylinder: any, index) => (
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={cylinder.cylinders}
                                                id={`cylinder-${index + 1}`}
                                                value={cylinder.cylinders}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e,
                                                        'cylinders',
                                                        cylinder.cylinders,
                                                    )
                                                }
                                                checked={
                                                    router.query.cylinders?.includes(
                                                        cylinder.cylinders,
                                                    ) || false
                                                }
                                            />
                                        ),
                                    )}
                                </FilterComponent>

                                <FilterComponent
                                    filterName='Fuel Type'
                                    id='fuel_type'
                                >
                                    {filters.enginesType.map(
                                        (engine: any, index) => (
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={
                                                    engine.engine_type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    engine.engine_type.slice(1)
                                                }
                                                id={`fuel-${index + 1}`}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e,
                                                        'engine_type',
                                                        engine.engine_type,
                                                    )
                                                }
                                                checked={
                                                    router.query.engine_type?.includes(
                                                        engine.engine_type,
                                                    ) || false
                                                }
                                            />
                                        ),
                                    )}
                                </FilterComponent>

                                <FilterComponent
                                    filterName='Body Type'
                                    id='body_type'
                                >
                                    {filters.bodiesType.map(
                                        (body: any, index) => (
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={body.type}
                                                id={`body-${index + 1}`}
                                                value={body.type}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        e,
                                                        'body_type',
                                                        body.type,
                                                    )
                                                }
                                                checked={
                                                    router.query.body_type?.includes(
                                                        body.type,
                                                    ) || false
                                                }
                                            />
                                        ),
                                    )}
                                </FilterComponent>
                            </>
                        )}
                    </div>
                    <div className='p-4'>
                        {/* Apply Button */}
                        <button
                            onClick={() => handleFilterModal(false)}
                            className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg'
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileFilterModal;
