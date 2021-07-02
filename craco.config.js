// const theme = require('./theme');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@font-family': `Nunito, sans-serif`,
              '@modal-header-padding-vertical': '@padding-lg',
              '@modal-header-padding-horizontal': '@padding-lg',
              '@primary-color': '#005A8D',
              '@link-color': '#005A8D',
              '@success-color': 'hsl(100, 77%, 44%)',
              '@warning-color': '#faad14',
              '@error-color': '#f5222d',
              '@font-size-base': '14px',
              '@heading-color': 'rgba(0, 0, 0, 0.85)',
              '@text-color': 'rgba(0, 0, 0, 0.65)',
              '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
              '@disabled-color': 'rgba(0, 0, 0, 0.25)',
              '@border-radius-base': '4px',
              '@border-color-base': '#d9d9d9',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
