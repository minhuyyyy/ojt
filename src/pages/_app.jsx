import React from 'react';
// ducks
import duckCreator from '@ducks/duckCreator';

// redux
import { getDuckEgg, wrapperInitializer } from '@redux/store';

//styles
import '../app/globals.css';

//layout
import Layout from '@components/Layout';

//toaster
import { Toaster } from 'sonner';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Toaster />
            <Component {...pageProps} />
        </Layout>
    );
};

const options = {};

const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(
    collectEggsFromDucks([duckCreator]),
    options,
);

export default wrapper.wrapApp(MyApp);
