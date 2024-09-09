module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      'babel-plugin-istanbul',
      {
        extension: ['.js', '.vue'],
        // deixar true se quiser ver o coverage detalhado no /coverage/lcov-report/index.html
        useInlineSourceMaps: false,
        compact: true,
        exclude: []
      }
    ]
  ]
};
