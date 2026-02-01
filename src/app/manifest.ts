import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'IMPCTFUL Creator OS',
        short_name: 'IMPCTFUL',
        description: 'The operating system for high-impact creators.',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#09090b',
        theme_color: '#09090b',
        icons: [
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: 'any',
                type: 'image/png',
            }
        ],
    }
}
