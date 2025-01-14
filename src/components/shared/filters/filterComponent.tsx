//react
import { Color } from '@contracts/types/color';
import filterState from '@utils/filterUtils/filterState';
import React, { ChangeEventHandler, ReactNode } from 'react';

function handleInputPattern(inputType: string) {
    return inputType === 'text' ? '[0-9]*' : '';
}
function returnId(id: string, title: string) {
    return `${title.toLowerCase()}_${id}`;
}

function splitColorName(color: string) {
    const simplifiedColors = [
        'Black',
        'Brown',
        'White',
        'Blue',
        'Red',
        'Green',
    ];

    // Split the color string into words
    const colorParts = color.split(' ');

    // Check each word in the color string against the simplifiedColors array
    for (let i = 0; i < colorParts.length; i++) {
        if (simplifiedColors.includes(colorParts[i])) {
            return colorParts[i];
        }
    }

    // If no match found, return the second word (as per the original logic)
    return colorParts[1];
}

export function ColorFilter({
    colors,
    pushUrlParams,
    type,
}: {
    colors: Color[];
    pushUrlParams: (key: string, value: string | number) => void;
    type: string;
}) {
    const filteredColors = filterState(colors, ['name', 'rgb']);

    return (
        <div className='grid grid-cols-3 container h-40 w-full overflow-y-scroll gap-y-2 gap-x-5 my-4'>
            {filteredColors.map(
                (color: Color) =>
                    color.rgb && (
                        <div
                            className='flex flex-col items-center'
                            key={color.name}
                            onClick={() =>
                                pushUrlParams(type, splitColorName(color.name))
                            }
                        >
                            <div
                                className='border-2 border-gray-200 w-10 h-10 rounded-full'
                                style={{ backgroundColor: `rgb(${color.rgb})` }}
                            />
                            <div className='text-center'>
                                {splitColorName(color.name)}
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
}
export function FilterInput({
    filterName,
    type,
    value,
    placeholder,
    id,
    onChange,
    className,
    inputStyle,
    checked,
}: {
    filterName: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    inputStyle?: string;
    checked?: boolean;
}) {
    return (
        <div className={`flex ${className}`}>
            <input
                pattern={handleInputPattern(type)}
                type={type}
                placeholder={placeholder}
                className={inputStyle}
                id={placeholder && returnId(id, placeholder)}
                value={value}
                defaultValue={value}
                onChange={onChange}
                checked={checked}
            />
            <label
                htmlFor={placeholder && returnId(id, placeholder)}
                className='text-gray-400 font-semibold'
            >
                {filterName}
            </label>
        </div>
    );
}

function FilterComponent({
    filterName,
    href,
    children,
    id,
    onClick,
}: {
    filterName: string;
    href?: string;
    children: ReactNode;
    id: string;
    onClick?;
}) {
    return (
        <div
            className='divider'
            suppressHydrationWarning
        >
            <details id={id}>
                <summary>
                    {href ? (
                        <a
                            href={href}
                            onClick={onClick}
                        >
                            <b>{filterName}</b>
                        </a>
                    ) : (
                        <b>{filterName}</b>
                    )}
                </summary>
                {children}
            </details>
        </div>
    );
}

export default FilterComponent;
