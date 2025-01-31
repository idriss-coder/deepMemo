import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Next.js App',
        short_name: 'Next.js App',
        description: 'Next.js App',
        start_url: '/',
        display: 'standalone',
        background_color: '#141F25',
        theme_color: '#4abef7',
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        screenshots: [
            {
                src: "/screenshots/app-wide.png",
                sizes: "1919x1079",
                type: "image/png",
                form_factor: "wide"        // Capture pour Desktop
            },
            {
                src: "/screenshots/app-phone.png",
                sizes: "394x851",
                type: "image/png"
                // pas de "form_factor" => reconnu comme mobile
            }
        ]
    }
}