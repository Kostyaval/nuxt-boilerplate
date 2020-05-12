import { join } from 'path'
const isDev = process.env.NODE_ENV !== 'production'

const cleanupIDs = require('svgo/plugins/cleanupIDs')
const removeAttrs = require('svgo/plugins/removeAttrs')
const removeUnknownsAndDefaults = require('svgo/plugins/removeUnknownsAndDefaults')
const removeDimensions = require('svgo/plugins/removeDimensions')
const removeViewBox = require('svgo/plugins/removeViewBox')
const inlineStyles = require('svgo/plugins/inlineStyles')
const inlineDefs = require('@nuxtjs/svg-sprite/lib/plugins/inlineDefs.js')

function defaultPlugins() {
  removeAttrs.active = true
  removeAttrs.params.attrs = 'svg:id'
  removeUnknownsAndDefaults.active = true
  removeUnknownsAndDefaults.params.keepDataAttrs = false
  removeUnknownsAndDefaults.params.keepAriaAttrs = false
  removeViewBox.active = false
  removeDimensions.active = true
  inlineStyles.active = true
  inlineStyles.params.onlyMatchedOnce = false
  return [
    removeDimensions,
    cleanupIDs,
    removeAttrs,
    removeViewBox,
    inlineStyles,
    removeUnknownsAndDefaults,
    { inlineDefs } // NOTE: it's important to pass custom plugins as object.
  ]
}

export default {
  mode: 'universal',
  ...(!isDev && {
    modern: 'client'
  }),
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FA3EC2' },
  /*
   ** Global CSS
   */
  router: {
    prefetchLinks: false
  },

  css: ['./assets/sass/global.sass'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@aceforth/nuxt-optimized-images'
  ],

  optimizedImages: {
    inlineImageLimit: -1,
    imagesName: ({ isDev }) =>
      isDev
        ? '[path][name][hash:optimized].[ext]'
        : 'img/[contenthash:7].[ext]',
    responsiveImagesName: ({ isDev }) =>
      isDev
        ? '[path][name]--[width][hash:optimized].[ext]'
        : 'img/[contenthash:7]-[width].[ext]',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 85
    },
    optipng: false,
    pngquant: {
      speed: 7,
      quality: '65-80'
    },
    webp: {
      quality: 75
    }
  },

  render: {
    // http2: {
    //     push: true,
    //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
    //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    //   },
    // // Gzip compressor better activate in nginx configuration
    // compressor: false,
    resourceHints: false /* like prefetchLinks: false */
    // // Etag better activate in nginx configuration
    // etag: false,
    // static: {
    //  etag: false
    // }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-webfontloader',
    '@nuxtjs/svg-sprite'
  ],
  // Axios module configuration
  axios: {},

  // Web Font Loader
  webfontloader: {
    events: false,
    custom: {
      families: ['navigo:n3,n4,n7'],
      urls: ['https://use.typekit.net/moi3lar.css']
    },
    timeout: 5000
  },
  // Svg sprite module
  svgSprite: {
    // pass costum config
    svgoConfig() {
      return {
        plugins: defaultPlugins()
      }
    }
  },
  // Build configuration
  build: {
    analyze: {
      openAnalyzer: true
    },
    // Disable default nuxt.js optimization in favor of cssnano
    optimizeCss: false,
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    postcss: {
      plugins: {
        // added tailwindcss before css optimization
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        // Cssnano advanced optimization for all css (assets and libs)
        ...(!isDev && {
          cssnano: {
            preset: [
              'advanced',
              {
                autoprefixer: false,
                cssDeclarationSorter: false,
                zindex: false,
                discardComments: {
                  removeAll: true
                }
              }
            ]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),
      // cssnano always last plugin
      order: 'cssnanoLast'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
