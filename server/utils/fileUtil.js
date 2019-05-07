"use strict";
var http = require("http");
var fileConfig = require("../config/fileserver-config");

function readFile() {}

function createFile(file, cb) {
  console.log(file);
  var options = {
    hostname: fileConfig.host,
    port: fileConfig.port,
    path: fileConfig.path,
    method: "POST"
  };

  http
    .request(options, function(res) {
      if (res.statusCode !== 200) {
        return cb({ status: "failure", code: res.statusCode, data: null });
      } else {
        return cb({ status: "success", code: res.statusCode, data: null });
      }
    })
    .end();
}

function listFiles() {}

module.exports = {
  readFile: readFile,
  createFile: createFile,
  listFiles: listFiles
};
