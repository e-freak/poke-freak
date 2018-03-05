/**
 * release.js
 * 
 * @author yuki
 */

require('electron-packager')({
    name: 'poke-freak',
    dir: '.',
    out: './bin',
    icon: './app/favicon.ico',
    platform: 'win32',
    arch: 'ia32',
    overwrite: true,
    prune: true,
    asar: false,
    ignore: 'bin|cache|src|.+\.bat|.+\.md|\.gitignore|gulpfile.*\.js|release\.js',
}, (message = 'Done.') => {
    console.log(message);
});
