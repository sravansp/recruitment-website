/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add a rule to handle binary files
      config.module.rules.push(
        {
          test: /\.(node)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // Output binaries in the public directory
                publicPath: '/_next/static/binaries',
                outputPath: `${isServer ? '../' : ''}static/binaries/`,
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/pdf',
                outputPath: `${isServer ? '../' : ''}static/pdf/`,
                name: '[name].[ext]',
                esModule: false, // Add this line
              },
            },
          ],
        }
      );
  
      return config;
    },
  };
  
  export default nextConfig;
  