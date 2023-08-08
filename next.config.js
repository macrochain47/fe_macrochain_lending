/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'goerli.arcade.xyz',
          },
        ],
    },
}

module.exports = nextConfig
