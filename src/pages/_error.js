import Head from 'next/head';

const ErrorPage = ({ statusCode, title }) => {
    return (
        <div>
            <Head>
                <title>Error Page</title>
            </Head>
            <h1>{statusCode}</h1>
            <h1>{title}</h1>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res = {}, err = {} }) => {
    let { statusCode } = res;

    if (!statusCode) {
        ({ statusCode = 404 } = err);
    }

    if (statusCode === 200) statusCode = 500;

    return {
        statusCode: 400,
        title: "Something gone wrong!!",
    };
};

export default ErrorPage;
