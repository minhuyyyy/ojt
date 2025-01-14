import React from 'react';

function CompareModal() {
    return (
        <div className='w-full h-20 border-b-gray-200 border-b-2 rounded-md flex flex-row items-center justify-center bg-white'>
            <div className='w-10/12 flex flex-row justify-between items-center'>
                <p>Add up to 5 cars</p>
                <div className='w-20 h-14 border-gray-200 border-2 rounded-md'></div>
                <div className='w-20 h-14 border-gray-200 border-2 rounded-md'></div>
                <div className='w-20 h-14 border-gray-200 border-2 rounded-md'></div>
                <div className='w-20 h-14 border-gray-200 border-2 rounded-md'></div>
                <div className='w-20 h-14 border-gray-200 border-2 rounded-md'></div>
                <>Compare</>
                <>Clear all</>
            </div>
        </div>
    );
}

export default CompareModal;
