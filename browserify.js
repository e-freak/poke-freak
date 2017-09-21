/**
 * browserify.js
 * 
 * @author yuki
 */

import browserify from 'browserify';
import through from 'through2';



export default function () {
    return through.obj((file, encode, callback) => {
        browserify(file.path).bundle((error, source) => {
            file.contents = source;
            callback(null, file);
        });
    });
};
