// next.config.js
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
});

module.exports = withPWA({
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        turbo: {
            resolveExtensions: [
                '.mdx',
                '.tsx',
                '.ts',
                '.jsx',
                '.js',
                '.mjs',
                '.json',
            ],
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: []
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: '/plaground/home',
                permanent: true,
            },
        ]
    }
})

// module.exports = withPWA({
//     reactStrictMode: true,
//     eslint: {
//         // Warning: This allows production builds to successfully complete even if
//         // your project has ESLint errors.
//         ignoreDuringBuilds: true,
//     },
// })
