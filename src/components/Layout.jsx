//components
import Footer from './footer';
import NavbarComponent from './shared/navigations/navbar';

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-col min-h-screen min-w-screen content-center'>
                <NavbarComponent />
                <div className=' top-0'></div>
                <div className='flex-row flex justify-center content-center mt-6 mb-10'>
                    <div className='w-4/5'>{children}</div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
