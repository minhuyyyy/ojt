import React, { memo } from 'react';
import Divider from '../Divider/divider';
import { faker } from '@faker-js/faker';
import { Trim } from '@contracts/index';
import Image from 'next/image';
import convertToCurrency from '@utils/stringUtils';

function CarCard({ car }: { car: Trim }) {
    return (
        <div className='car-card border-gray-200 border-2 rounded-md flex flex-col justify-between'>
            <div className='bg-gray-500 flex-1'>
                <div className='max-w-sm mx-auto'>
                    <Image
                        src={car.image}
                        alt='car'
                        width={100}
                        height={100}
                        priority
                    />
                </div>
            </div>
            <div className='p-4 flex flex-col justify-end'>
                <h2 className='font-bold'>{`${car.year} ${
                    car.make_model.make.name
                } ${car.description.slice(0, 12)}...`}</h2>
                <p
                    className='font-semibold text-gray-500 py-2'
                    suppressHydrationWarning
                >
                    {`${car.mileage} miles`}
                </p>
                <h3
                    suppressHydrationWarning
                    className='font-bold text-2xl'
                >
                    {convertToCurrency(car.msrp)}
                </h3>
                <Divider />
                <div
                    suppressHydrationWarning
                    className='text-sm text-gray-500'
                >
                    {faker.location.streetAddress()}
                </div>
            </div>
        </div>
    );
}

export default memo(CarCard);
