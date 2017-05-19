/**
 * release.js
 * 
 * @author yuki
 */

const packager = require("electron-packager");



packager({
    name: 'poke-freak',
    dir: '.',
    out: './bin',
    icon: './app/favicon.ico',
    platform: 'win32',
    arch: 'ia32',
    overwrite: true,
    prune: true,
    asar: true,
    ignore: 'bin|cache|src|.+\.bat|.+\.md|\.gitignore|gulpfile\.js|release\.js',
}, (error) => {
    console.log(error || "Done.");
});

