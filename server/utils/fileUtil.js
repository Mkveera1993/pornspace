"use strict";
var http = require("http");
var fileConfig = require("../config/fileserver-config");
var jsftp = require("jsftp");

const Ftp = new jsftp({
  host: fileConfig.host,
  port: fileConfig.port,
  user: fileConfig.user,
  pass: fileConfig.pass
});

function readFile() {}

function createFile(file, cb) {
  console.log(fileConfig.base_path);

  Ftp.raw("mkd", fileConfig.base_path, (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log(data);
    Ftp.put(file.buffer, fileConfig.base_path + file.originalname, err => {
      if (!err) {
        console.log("File transferred successfully!");
        return cb({ status: "success", code: 200, data: null });
      } else {
        console.log(err);
        return cb({ status: "failure", code: 500, data: null });
      }
    });
  });
}

function listFiles() {}

module.exports = {
  readFile: readFile,
  createFile: createFile,
  listFiles: listFiles
};
