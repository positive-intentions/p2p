const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const moduleRedundency = ({
    moduleName,
    urls
  }) => (`promise new Promise(async (resolve) => {

    function getRandomNumber(min, max) {
      if (min > max) {
          throw new Error("Minimum value must be less than or equal to the maximum value.");
      }
      // Generate and return a random integer between min and max, inclusive
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  
    const urls = ${JSON.stringify(urls)}
  
  
    function checkUrl(url) {
      const timestamp = Date.now();
      return fetch(url, {
        method: "HEAD",
        mode: 'no-cors'
      })
        .then(res => {
            return {
              url,
              ping: Date.now() - timestamp
            }
        })
        .catch(error => null);
    }
  
    const availabilityPromises = urls
      .map(url =>
        checkUrl(url)
      )
      .filter(url => !!url);
  
    // Use Promise.race to find the first URL that responds with an available resource
    const urlPings = await Promise.all(availabilityPromises)
      .catch(error => {
        // Handle the case where none of the URLs are available
        reject(new Error('None of the URLs responded positively: ' + error.message));
      });
    
    const firstAvailableUrl = urlPings
      .filter(url => !!url)
      .reduce((lowest, item) => {
          return item.ping < lowest.ping ? item : lowest;
      });
  
    const remoteUrlWithVersion = firstAvailableUrl.url;
    const script = document.createElement('script')
    script.src = remoteUrlWithVersion
    script.onload = () => {
      // the injected script has loaded and is available on window
      // we can now resolve this Promise
      const proxy = {
        get: (request) => window.${moduleName}.get(request),
        init: (arg) => {
          try {
            return window.${moduleName}.init(arg)
          } catch(e) {
            console.log('remote container already initialized')
          }
        }
      }
      resolve(proxy)
    }
    // inject this script with the src set to the versioned remoteEntry.js
    document.head.appendChild(script);
  })
  `);

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist',
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            // css and scss loader
            {
                // test: /\.css$/,
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },

            // image loader
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: 'positive-intentions',
            short_name: 'PI',
            description: 'positive-intentions',
            "icons": [
                {
                    src: path.resolve('./public/favicon.ico'),
                    sizes: [96] // multiple sizes
                },
                {
                    src: path.resolve('./public/logo512.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    maskable: true,
                }


            ],
            "start_url": ".",
            "display": "standalone",
            "theme_color": "#44b700",
            "background_color": "#ffffff",
            // crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
            inject: true,
        }),
        new ModuleFederationPlugin({
            name: 'p2p',
            filename: 'remoteEntry.js',
            exposes: {
                './PeerProvider': './src/stories/components/PeerProvider.tsx',
            },
            remotes: {
                "dim": moduleRedundency({
                  moduleName: 'dim',
                  urls: [
                    'http://localhost:8081/remoteEntry.js', // local for testing
                    'https://positive-intentions.github.io/dim/remoteEntry.js',
                    'https://dim.positive-intentions.com/remoteEntry.js'
                  ]
                }),
              },
            shared: { react: { singleton: true }, "react-dom": { singleton: true } }
        }),
    ],
};