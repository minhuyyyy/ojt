export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { type, value } = e.target
    const returnValue = type === 'number' ? parseFloat(value) : value
    return returnValue
}