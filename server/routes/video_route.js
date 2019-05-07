"use strict";
var express = require("express");
var router = express.Router();
var _ = require("lodash");
var mongoose = require("mongoose");

/**Multer Config */

var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});

var videoService = require("../services/video_service");
var Video = require("../models/video_model");
var awsUtil = require("../utils/awsUtil");

module.exports = upload;

/* GET users listing. */
router.get("/", function(req, res) {
  videoService.getVideos(req.query, function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.get("/:id", function(req, res) {
  videoService.getVideo(req.params.id, function(err, video) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(video);
    }
  });
});

router.get("/play/:id", function(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  Video.findById(id, function(err, video) {
    if (err) {
      res.status(500).send(err);
    } else {
      awsUtil.readFile(video, req, res);
    }
  });
});

router.post("/", function(req, res) {
  videoService.createVideo(req.body, function(err, video) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(video);
    }
  });
});

router.post("/upload", upload.single("file"), function(req, res) {
  videoService.uploadVideo(req.file, function(err, video) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(video);
    }
  });
});

module.exports = router;
