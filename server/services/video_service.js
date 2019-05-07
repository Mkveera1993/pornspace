"use strict";

var Video = require("../models/video_model");
var mongoose = require("mongoose");
var awsUtil = require("../utils/awsUtil");
var fileUtil = require("../utils/fileUtil");

function getVideos(query, callback) {
  Video.paginateQuery(query, function(err, videos) {
    if (err) {
      callback(err);
    } else {
      callback(null, videos);
    }
  });
}

function getVideo(id, callback) {
  id = mongoose.Types.ObjectId(id);
  Video.findById(id, function(err, video) {
    if (err) {
      callback(err);
    } else {
      callback(null, video);
    }
  });
}

function playVideo(id, res) {
  id = mongoose.Types.ObjectId(id);
  Video.findById(id, function(err, video) {
    if (err) {
      res.status(500).json({
        error: "Error -> " + err
      });
    } else {
      if (video.source === "AWS") {
        awsUtil.readFile(video.source, res);
      }
    }
  });
}

function createVideo(body, callback) {
  Video.createVideo(body, function(err, video) {
    if (err) {
      callback(err);
    } else {
      callback(null, video);
    }
  });
}

function uploadVideo(file, callback) {
  // awsUtil.createFile(file, function(err, data) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, data);
  //   }
  // });
  fileUtil.createFile(file, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

var videoService = {
  getVideos: getVideos,
  getVideo: getVideo,
  playVideo: playVideo,
  createVideo: createVideo,
  uploadVideo: uploadVideo
};

module.exports = videoService;
