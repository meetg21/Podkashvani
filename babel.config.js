module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel',[
        'module:react-native-dotenv',
        {
            moduleName: '@env',
            path: '.env',
            safe: false,
            allowUndefined: true,
            blocklist: null,
            allowlist: null,
            verbose: false,
        },
    ],],
    },
  },
};