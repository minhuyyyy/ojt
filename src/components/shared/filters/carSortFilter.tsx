import React from 'react';

//components
import Sort from './sort/sort';
import Wallet from '../wallet/wallet';
import Compare from './compare/compare';

function SortAndCompare() {
    const criterias = ['Text', 'Text', 'Text', 'Text'];

    return (
        <div className='border-gray-200 border-2 rounded-md p-4'>
            <div className='flex flex-row justify-end space-x-8 mb-2'>
                <Compare />
                <Sort className='hidden md:block' />
                <Wallet className='hidden md:block' />
            </div>
            <div className='border-gray-200 border-2 rounded-md p-4'>
                <div className='mb-2'>Text</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {criterias.map((criteria, index) => (
                        <div
                            key={index}
                            className='w-full border-gray-200 border-2 rounded-md p-2'>
                            {criteria}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SortAndCompare;
