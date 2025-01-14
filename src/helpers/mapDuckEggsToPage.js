import { getDuckEgg, wrapperInitializer } from '@redux/store';
import React from 'react';

// redux

export const mapDuckEggsToPage = (PageComponent, options = {}) => {
    const { reducers = [], modules = [] } = options;

    // transform all reducers and modules from ducks to eggs templates
    const duckEggs = [...reducers, ...modules].map(getDuckEgg);

    // prepare all transformed eggs to wrap the Page component
    // https://github.com/fostyfost/redux-eggs/tree/main/packages/next#readme
    const { wrapPage, wrapGetInitialProps } =
        wrapperInitializer.getPageWrapper(duckEggs);

    const WrappedPage = wrapPage((props) =>
        React.createElement(PageComponent, props),
    );

    // Using displayName for debugging
    WrappedPage.displayName = PageComponent.name;

    if (PageComponent.getInitialProps) {
        WrappedPage.getInitialProps = wrapGetInitialProps(
            enhancedCtx(PageComponent.getInitialProps),
        );
    }

    return {
        WrappedPage,
    };
};

const enhanceContext = (ctx, store) => {
    ctx.store = store;
};

const enhancedCtx = (callback) => (store) => (ctx) => {
    enhanceContext(ctx, store);
    return callback(ctx);
};
