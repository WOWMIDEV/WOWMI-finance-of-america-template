module.exports = {
  gifsicle: { optimizationLevel: 2, interlaced: false, colors: 10 },
  mozjpeg: { progressive: true, quality: 60 },
  pngquant: { quality: [0.55, 0.8] },
  svgo: {
    plugins: [
      { removeViewBox: false },
      { cleanupIDs: true },
    ],
  },
  webp: { quality: 10 },
};
