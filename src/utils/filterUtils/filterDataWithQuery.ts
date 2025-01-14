import { Filter, Trim } from "@contracts/index";
import { getFilters } from "@redux/selectors";

const filterNumber = (
    query: Record<string, any>,
    data: Trim[],
    field: string
) => {
    const minValue = query[`min_${field}`] ? parseInt(query[`min_${field}`], 10) : undefined;
    const maxValue = query[`max_${field}`] ? parseInt(query[`max_${field}`], 10) : undefined;

    return data.filter((item) => {
        const itemValue = Number(item[field as keyof Trim]) || 0;
        if (minValue !== undefined && itemValue <= minValue) return false;
        if (maxValue !== undefined && itemValue >= maxValue) return false;
        return true;
    });
};

const filterDataWithQuery = (data: Trim[], query: Record<string, any>, filters: Filter) => {
    if (query) {
        Object.keys(query).forEach((key) => {
            let value = query[key];

            if (key.includes('min_') || key.includes('max_')) {
                const field = key.replace('min_', '').replace('max_', '');
                data = filterNumber(query, data, field);
            } else if (key === 'interior_color' || key === 'exterior_color') {
                // Handle color filtering
                data = data.filter((item) => {
                    // Determine which color array to use (interior or exterior)
                    const colors = item.colors?.[key === 'interior_color' ? 'interior_colors' : 'exterior_colors'];

                    // Ensure colors is an array and filter the data
                    return Array.isArray(colors) && colors.some((color) => {
                        // Case-insensitive match for color name
                        return color.name.includes(value);
                    });
                });
            }
            else if (key === 'trim') {
                // Handle trim filtering
                data = filters.trims.filter((trim: Trim) => {
                    return trim.description === value;
                });
            }

            else if (Array.isArray(value)) {
                // Handle array filtering
                data = data.filter((item) => {
                    return value.some((v: string) => {
                        let itemValue: any;

                        // Check for nested keys
                        if (key === 'make') {
                            itemValue = item.make_model?.make?.name;
                        } else if (key === 'model') {
                            itemValue = item.make_model?.name;
                        } else {
                            itemValue = item[key as keyof Trim];
                        }

                        if (typeof itemValue === 'string') {
                            itemValue = itemValue.trim().toLowerCase();
                        }

                        return itemValue === v.trim().toLowerCase();
                    });
                });
            } else {
                // Handle single value filtering
                data = data.filter((item) => {
                    let itemValue: any;

                    // Check for nested keys
                    if (key === 'make') {
                        itemValue = item.make_model?.make?.name;
                    } else if (key === 'model') {
                        itemValue = item.make_model?.name;
                    } else {
                        itemValue = item[key as keyof Trim];
                    }

                    if (typeof itemValue === 'string') {
                        itemValue = itemValue.trim().toLowerCase();
                    }

                    const filterValue = (value as string)?.trim().toLowerCase();
                    return itemValue === filterValue;
                });
            }
        });
    }

    return data;
};

export default filterDataWithQuery;
