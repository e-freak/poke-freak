/**
 * release.js
 * 
 * @author yuki
 */

import packager from 'electron-packager';



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
    ignore: 'bin|cache|src|.+\.bat|.+\.md|\.gitignore|gulpfile.*\.js|release\.js',
}, (message = 'Done.') => {
    console.log(message);
});

