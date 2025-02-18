/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const isProd = process.env.NODE_ENV === 'production';

// Docker deployment
const dockerDeploymentEnabled = false;

// Static Exports
let exportHtmlEnabled = process.env.EXPORT_ENABLED === 'false' ? false : true;
if (dockerDeploymentEnabled) exportHtmlEnabled = false;

const nextConfig = {
    reactStrictMode: true,
    // swcMinify is deprecated in 15.1.3, so setting it to false
    swcMinify: false, 

    productionBrowserSourceMaps: true,

    // Output for Docker and static export
    output: dockerDeploymentEnabled ? 'standalone' : (exportHtmlEnabled ? 'export' : undefined),

    // Image optimization
    images: {
        unoptimized: true
    },

    // Page extensions for Next.js
    pageExtensions: ['html.jsx', 'jsx', 'js', 'tsx', 'ts'],
    trailingSlash: false,

    // Webpack configuration
    webpack: (config) => {
        // Adding support for SVGs with @svgr/webpack
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },

    // Environment variables
    env: {
        exportHtml: `${exportHtmlEnabled}`
    }
};

module.exports = nextConfig;

