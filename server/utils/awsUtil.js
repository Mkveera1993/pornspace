"use strict";

var uuidv1 = require("uuid/v1");
var AWS = require("aws-sdk");
var config = require("../config/config");
var path = require("path");

path.extname("index.html");

AWS.config.update({
  accessKeyId: config.aws.access_key_id,
  secretAccessKey: config.aws.secret_access_key
});

var S3 = new AWS.S3();

function readFile(video, req, res) {
  if (req !== null && req.headers.range !== null) {
    var range = req.headers.range;
    var bytes = range.replace(/bytes=/, "").split("-");
    var start = parseInt(bytes[0], 10);

    var total = video.meta.contentLength;
    var end = bytes[1] ? parseInt(bytes[1], 10) : total - 1;
    var chunksize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Last-Modified": new Date(),
      "Content-Type": video.meta.mimetype
    });

    S3.getObject({
      Bucket: config.aws.s3_bucketname,
      Key: video.path,
      Range: range
    })
      .createReadStream()
      .pipe(res);
  } else {
    res.set("Content-Type", "application/octet-stream");
    S3.getObject({
      Bucket: config.aws.s3_bucketname,
      Key: video.path
    })
      .createReadStream()
      .on("error", function(err) {
        res.status(500).json({
          error: "Error -> " + err
        });
      })
      .pipe(res);
  }
}

function createFile(file, callback) {
  // var key = uuidv1().split("-").join("") + path.extname(file.originalname)
  var key = file.originalname;
  var params = {
    Bucket: config.aws.s3_bucketname,
    Key: key,
    Body: file.buffer
  };

  S3.upload(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      var result = {
        originalname: file.originalname,
        mimetype: file.mimetype,
        encoding: file.encoding,
        key: data.key,
        contentLength: file.buffer.length
      };
      callback(null, result);
    }
  });
}

module.exports = {
  readFile: readFile,
  createFile: createFile
};
