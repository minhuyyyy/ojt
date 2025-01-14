/**
 * Filters an array of objects based on specified keys and returns a unique array of objects.
 * The uniqueness is determined by the values of the specified keys.
 * 
 * @param {any[]} data - The array of objects to filter.
 * @param {string[]} keysToFilter - The keys used to determine uniqueness.
 * @returns {any[]} - An array of unique objects based on the specified keys.
 */
const filterState = (data: any[], keysToFilter: string[]) => {
    // Create a Map to store unique objects based on the specified keys
    const bodiesMap = new Map();

    // Iterate through each object in the data array
    data.forEach((body) => {
        let key;

        // If there are multiple keys to filter, create a composite key by joining the values of those keys
        if (keysToFilter.length > 1) {
            key = keysToFilter.map(k => body[k]).join('-'); // Composite key for multiple properties

            // Store the composite key in the Map with an object containing the specified keys and their values
            bodiesMap.set(key, keysToFilter.reduce((obj, k) => ({ ...obj, [k]: body[k] }), {}));
        } else {
            // If there is only one key, use it directly as the key in the Map
            key = body[keysToFilter[0]];

            // Store the key in the Map with an object containing the single key and its value
            bodiesMap.set(key, { [keysToFilter[0]]: body[keysToFilter[0]] });
        }
    });

    // Create a Set from the values of the Map to ensure uniqueness
    const bodiesSet = new Set(bodiesMap.values());

    // Convert the Set back to an array and return it
    return Array.from(bodiesSet);
}

export default filterState;
