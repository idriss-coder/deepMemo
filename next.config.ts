import type {NextConfig} from "next";

const withPWA = require('next-pwa')({
    dest: 'public', // dossier où sera généré le sw
    register: true, // auto-enregistrement du Service Worker
    skipWaiting: true // mise à jour immédiate du SW
})

const nextConfig: NextConfig = withPWA({
    reactStrictMode: true,
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
});

export default nextConfig;
