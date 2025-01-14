import { Fragment, useEffect, useRef, useState } from 'react';

//components
import {
    NavbarContent,
    NavbarItem,
    Navbar,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from '@nextui-org/react';
import Link from 'next/link';

function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (ref.current !== event.target) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('mousedown', handleOutSideClick);

        return () => {
            window.removeEventListener('mousedown', handleOutSideClick);
        };
    }, [ref]);
    const labels = [
        'Used Cars',
        'New Cars',
        'Private Seller Cars',
        'Sell My Car',
        'Instant Cash Offer',
        'Car Research & Tools',
        'Find Local Dealers',
    ];
    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            maxWidth={'full'}
            onMenuOpenChange={setIsMenuOpen}
            className=' bg-blue-900 text-white font-semibold z-40'
            ref={ref}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className='lg:hidden'
            />
            <div className='hidden lg:flex space-x-10 flex-row justify-center content-center '>
                <NavbarContent justify='center'>
                    {labels.map((item, index) => (
                        <Fragment key={item}>
                            <NavbarItem className='hover:cursor-pointer'>
                                {item}
                            </NavbarItem>
                        </Fragment>
                    ))}
                </NavbarContent>
            </div>

            <NavbarMenu className='w-full h-fit'>
                {labels.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? 'primary'
                                    : index === labels.length - 1
                                    ? 'danger'
                                    : 'foreground'
                            }
                            className='w-full'
                            href='/'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavbarComponent;
