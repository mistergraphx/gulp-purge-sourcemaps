'use strict';
var through = require('through2');

const PLUGIN_NAME = 'gulp-purge-sourcemaps';

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        // @TODO possibly throw if no sourcemap prop exists,
        // as it's no point using this plugin if there is no sourcemap
        if('sourceMap' in file) {
          delete file.sourceMap;
        }else{
          const regex = /\/\*# sourceMappingURL=.* \*\//gi;
          const str = file.contents.toString() ;
          const subst = `/**/`;
          const content = str.replace(regex, subst);
          file.contents = Buffer.from(content || '');
        }

        cb(null, file);
    });
};
