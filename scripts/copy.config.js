// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyWebPhotoFilter: {
    src: ['{{ROOT}}/node_modules/web-photo-filter/dist/webphotofilter**/*'],
    dest: '{{BUILD}}'
  }
} 
