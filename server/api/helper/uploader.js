var env = process.env.NODE_ENV || 'development';
var Busboy = require('busboy'),
    os = require('os'),
    path = require('path'),
    fs = require('fs');

// TODO: implement file size limit

exports.processFileUpload = function(req, allowedExtensions, callback){
  var busboy = new Busboy({ headers: req.headers });
  var tempFile = '';
  var fileExtenstion = '';
  var formPayload = {};

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    fileExtenstion = path.extname(filename).toLowerCase();
    tempFile = path.join(os.tmpDir(), path.basename(fieldname)+fileExtenstion);
    file.pipe(fs.createWriteStream(tempFile));
  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    var jsonValue = '';

    try {
      jsonValue = JSON.parse(val);
    } catch (e) {
      jsonValue = val;
    }

    formPayload[fieldname] = jsonValue;
  });

  busboy.on('finish', function() {
    if(allowedExtensions.length > 0){
      if(allowedExtensions.indexOf(fileExtenstion) == -1) {
        callback({message: 'extension_not_allowed'}, tempFile, formPayload);
      } else {
        callback(null, tempFile, formPayload)
      }
    } else {
      callback(null, tempFile, formPayload)
    }
  });

  return req.pipe(busboy);
}
