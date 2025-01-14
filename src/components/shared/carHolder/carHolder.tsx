//react
import React, { memo, useEffect } from 'react';

//components
import CarCard from '../carCard/carCard';

//types
import { Car } from '@contracts/types/car';

//redux-selectors
import { getFilters, getLoading } from '@redux/selectors';
import { Trim } from '@contracts/index';
function CarHolder() {
    const filters = getFilters();
    const loading = getLoading();

    return (
        <div className='w-full'>
            {!loading ? (
                <div
                    className='grid grid-cols-12 gap-4'
                    suppressHydrationWarning
                >
                    {filters.filteredCars && filters.filteredCars.length > 0 ? (
                        filters.filteredCars.map((car: Trim) => (
                            <div
                                className='sm:col-span-12 md:col-span-4'
                                key={car.id}
                            >
                                <CarCard car={car} />
                            </div>
                        ))
                    ) : (
                        <div className='mx-auto col-span-12 flex justify-center items-center'>
                            No cars match your filters
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex flex-row justify-center items-center text-center my-auto content-center'>
                    Loading...
                </div>
            )}
        </div>
    );
}

export default memo(CarHolder);
