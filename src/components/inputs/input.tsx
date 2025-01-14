import { FilterInput } from '@components/shared/filters/filterComponent';
import React, { ChangeEventHandler } from 'react';

export function TextInput({
    filterName,
    value,
    placeholder,
    id,
    onChange,
    className = '',
    inputStyle = '',
}: {
    filterName: string;
    value: string | number;
    placeholder: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    inputStyle?: string;
}) {
    return (
        <FilterInput
            type='text'
            filterName={filterName}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
            inputStyle={inputStyle}
        />
    );
}

export function CheckboxInput({
    filterName,
    value = '',
    placeholder = '',
    id,
    onChange,
    className = '',
    inputStyle = '',
    checked = false,
}: {
    filterName: string;
    value?: string | number;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    inputStyle?: string;
    checked?: boolean;
}) {
    return (
        <FilterInput
            type='checkbox'
            filterName={filterName}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
            inputStyle={inputStyle}
            checked={checked}
        />
    );
}
