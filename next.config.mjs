/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@redux-eggs'],
    redirects: () => [
        {
            source: '/:slug(\\d+)',
            destination: '/car/:slug',
            permanent: true,
        },
    ],
    rewrites: () => [],
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    // add config for preventing external/malicious users
    // https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/**/**',
            },
        ],
    },
};

export default nextConfig;
