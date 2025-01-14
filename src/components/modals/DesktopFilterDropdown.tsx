//react
import React, {
    ChangeEvent,
    Fragment,
    MouseEvent,
    useEffect,
    useState,
} from 'react';

//components
import { CheckboxInput, TextInput } from '@components/inputs/input';
import FilterComponent, {
    ColorFilter,
} from '@components/shared/filters/filterComponent';
import { Select, SelectItem } from '@nextui-org/react';

//types
import { Car } from '@contracts/types/car';

//redux-selectors
import { getFilters } from '@redux/selectors';

//hooks
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

function DesktopFilterDropdown() {
    const filters = getFilters();

    const [mileage, setMileage] = useState([0, 0]);
    const [year, setYear] = useState([0, 0]);
    const [selectedCar, setSelectedCar] = useState<Car>({} as Car);

    const [filteredModels, setFilteredModels] = useState<Car[]>([]);

    const pathname = usePathname();
    const router = useRouter();

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
                pathname: pathname,
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
    const handleAnchorTagClick = (
        e: MouseEvent<HTMLAnchorElement, MouseEvent>,
        detailsId: string,
    ) => {
        e.preventDefault();
        const details = document.getElementsByTagName('details');
        const selectedDetails = details.namedItem(detailsId);
        if (selectedDetails!.open == true) {
            selectedDetails!.open = false;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        } else {
            selectedDetails!.open = true;
            selectedDetails?.scrollIntoView({ behavior: 'smooth' });
        }
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

    useEffect(() => {
        const bodies = router.query.body;
        const bodiesArray = Array.isArray(bodies) ? bodies : [bodies];

        bodiesArray.forEach((body) => {
            if (
                body &&
                filters.bodiesType &&
                filters.bodiesType.includes(body)
            ) {
                removeUrlParamValue('body', body);
            }
        });
    }, [router.query.model]);

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

    return (
        <div className='w-full h-full overflow-y-scroll'>
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
                                id='year'
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                placeholder='Min'
                                value={
                                    Number(router.query.min_year) ||
                                    year[0] ||
                                    0
                                }
                                className='flex-col-reverse'
                            />
                            <TextInput
                                inputStyle='w-4/5'
                                filterName='Max'
                                id='year'
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Max'
                                value={
                                    Number(router.query.max_year) ||
                                    year[1] ||
                                    0
                                }
                                className='flex-col-reverse'
                            />
                        </div>
                    </FilterComponent>
                    <FilterComponent
                        filterName='Make, Model & Trim'
                        href='#makes'
                        id='makes'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'makes')}
                    >
                        <div
                            className='dropdown-container z-10'
                            suppressHydrationWarning
                        >
                            <p className='text-gray-400 font-semibold py-2'>
                                {!selectedCar?.name
                                    ? `${selectedCar.make_name} ${selectedCar.name}`
                                    : 'Vehicle 1'}
                            </p>
                            <>
                                {filters.makes && filters.makes.length > 0 && (
                                    <Select
                                        label='Select Make'
                                        name='makes'
                                        id='makes'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900 z-30'
                                        placeholder={
                                            router.query.make?.toString() ||
                                            'Any Make'
                                        }
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        items={filters.makes}
                                        popoverProps={{
                                            shouldCloseOnBlur: true,
                                        }}
                                    >
                                        {(make) => (
                                            <SelectItem
                                                isDisabled={
                                                    make.numberOfCars === 0
                                                }
                                                key={make.id}
                                                value={make.id}
                                                onPress={() => {
                                                    pushUrlParams(
                                                        'make',
                                                        make.name,
                                                    );
                                                }}
                                                isSelected={
                                                    selectedCar.make_name ===
                                                    make.name
                                                }
                                                className='font-bold z-30'
                                            >
                                                {`${make.name} (${make.numberOfCars})`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {selectedCar.make_name && filteredModels && (
                                    <Select
                                        label='Models'
                                        name='models'
                                        id='models'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder={
                                            router.query.model?.toString() ||
                                            'Any'
                                        }
                                        popoverProps={{
                                            shouldCloseOnBlur: true,
                                        }}
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        items={filteredModels}
                                    >
                                        {(car: Car) => (
                                            <SelectItem
                                                key={car.id}
                                                value={car.name}
                                                onPress={() => {
                                                    pushUrlParams(
                                                        'model',
                                                        car.name,
                                                    );
                                                }}
                                                isSelected={
                                                    car.name ===
                                                    selectedCar.name
                                                }
                                            >
                                                {`${car.name}`}
                                            </SelectItem>
                                        )}
                                    </Select>
                                )}
                            </>
                            <>
                                {selectedCar.name && (
                                    <Select
                                        label='Trims'
                                        name='trims'
                                        id='trims'
                                        className='flex flex-row justify-between w-full p-2 content-center text-gray-900'
                                        placeholder={
                                            router.query.trim?.toString() ||
                                            'Any'
                                        }
                                        variant='bordered'
                                        radius='sm'
                                        scrollShadowProps={{
                                            isEnabled: false,
                                        }}
                                        popoverProps={{
                                            shouldCloseOnBlur: true,
                                        }}
                                    >
                                        {filters.trims &&
                                            filters.trims.map((trim) => (
                                                <SelectItem
                                                    key={trim.id}
                                                    value={trim.description}
                                                    onPress={() => {
                                                        setSelectedCar({
                                                            ...selectedCar,
                                                            selectedTrim:
                                                                trim.description,
                                                        });
                                                        pushUrlParams(
                                                            'trim',
                                                            trim.description,
                                                        );
                                                    }}
                                                    isSelected={
                                                        router.query.toString() ===
                                                        trim.description
                                                    }
                                                >
                                                    {trim.description}
                                                </SelectItem>
                                            ))}
                                    </Select>
                                )}
                            </>
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
                                id='mileage'
                                onChange={(e) => handleInputChange(e)}
                                placeholder={'Min'}
                                value={
                                    Number(router.query.min_mileage) ||
                                    mileage[0] ||
                                    0
                                }
                                className='flex-col-reverse'
                            />
                            <TextInput
                                inputStyle='w-4/5'
                                filterName='Max'
                                id='mileage'
                                onChange={(e) => handleInputChange(e)}
                                placeholder='Max'
                                value={
                                    Number(router.query.max_mileage) ||
                                    mileage[1] ||
                                    0
                                }
                                className='flex-col-reverse'
                            />
                        </div>
                    </FilterComponent>
                    <FilterComponent
                        filterName='Body Style'
                        href='#bodies'
                        id='bodies'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'bodies')}
                    >
                        <div className='dropdown-container'>
                            {filters.bodiesType &&
                                filters.bodiesType.map(
                                    (item: any, index: number) => (
                                        <Fragment key={index}>
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={item.type}
                                                id={`body-${index + 1}`}
                                                value={item.type}
                                                onChange={(e) => {
                                                    handleCheckboxChange(
                                                        e,
                                                        'body_type',
                                                        item.type.toLowerCase(),
                                                    );
                                                }}
                                                checked={router.query.body_type?.includes(
                                                    item.type.toLowerCase(),
                                                )}
                                            />
                                        </Fragment>
                                    ),
                                )}
                        </div>
                    </FilterComponent>
                    <FilterComponent
                        filterName='Fuel Type'
                        href='#fuel-type'
                        id='fuel-type'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'fuel-type')}
                    >
                        <div className='dropdown-container'>
                            {filters.enginesType &&
                                filters.enginesType.map(
                                    (item: any, index: number) => (
                                        <Fragment key={index}>
                                            <CheckboxInput
                                                inputStyle='mr-2'
                                                filterName={
                                                    item.engine_type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    item.engine_type.slice(1)
                                                }
                                                id={`fuel-${index + 1}`}
                                                onChange={(e) => {
                                                    handleCheckboxChange(
                                                        e,
                                                        'engine_type',
                                                        item.engine_type.toLowerCase(),
                                                    );
                                                }}
                                                checked={router.query.engine_type?.includes(
                                                    item.engine_type.toLowerCase(),
                                                )}
                                            />
                                        </Fragment>
                                    ),
                                )}
                        </div>
                    </FilterComponent>
                    {filters.interiorColors && (
                        <FilterComponent
                            filterName='Interior Color'
                            href='#interior-color'
                            id='interior-color'
                            onClick={(
                                e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                            ) => handleAnchorTagClick(e, 'interior-color')}
                        >
                            <ColorFilter
                                colors={filters.interiorColors}
                                pushUrlParams={pushUrlParams}
                                type='interior_color'
                            />
                        </FilterComponent>
                    )}

                    {filters.exteriorColors && (
                        <FilterComponent
                            filterName='Exterior Color'
                            href='#exterior-color'
                            id='exterior-color'
                            onClick={(
                                e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                            ) => handleAnchorTagClick(e, 'exterior-color')}
                        >
                            <ColorFilter
                                colors={filters.exteriorColors}
                                pushUrlParams={pushUrlParams}
                                type='exterior_color'
                            />
                        </FilterComponent>
                    )}

                    <FilterComponent
                        filterName='Cylinders'
                        href='#cylinders'
                        id='cylinders'
                        onClick={(
                            e: MouseEvent<HTMLAnchorElement, MouseEvent>,
                        ) => handleAnchorTagClick(e, 'cylinders')}
                    >
                        <div className='dropdown-container'>
                            {filters.cylinders &&
                                filters.cylinders.map(
                                    (item: any, index: number) => (
                                        <Fragment key={item.cylinders || index}>
                                            {item.cylinders && (
                                                <CheckboxInput
                                                    inputStyle='mr-2'
                                                    filterName={item.cylinders}
                                                    id={`cylinder-${index + 1}`}
                                                    value={item.cylinders}
                                                    onChange={(e) => {
                                                        handleCheckboxChange(
                                                            e,
                                                            'cylinders',
                                                            item.cylinders,
                                                        );
                                                    }}
                                                    checked={
                                                        Array.isArray(
                                                            router.query
                                                                .cylinders,
                                                        )
                                                            ? router.query.cylinders.includes(
                                                                  item.cylinders,
                                                              )
                                                            : router.query
                                                                  .cylinders ===
                                                              item.cylinders
                                                    }
                                                />
                                            )}
                                        </Fragment>
                                    ),
                                )}
                        </div>
                    </FilterComponent>
                </>
            )}
        </div>
    );
}

export default DesktopFilterDropdown;
