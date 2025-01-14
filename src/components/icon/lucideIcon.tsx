//interface
import { IIconProps } from '@contracts/interfaces/IIconProps';

//icon import
import { icons } from 'lucide-react';

const IconLucide: React.FC<IIconProps> = ({ name, color, size, className }) => {
    const LucideIcon = icons[name as keyof typeof icons];

    if (!LucideIcon) {
        return null; // Or handle the error appropriately
    }

    return (
        <LucideIcon
            className={className}
            color={color}
            size={size}
        />
    );
};

export default IconLucide;
