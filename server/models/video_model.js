"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var paginate = require("../utils/paginateUtil");

var videoSchema = new Schema({
  serialNo: {
    type: Number,
    unique: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  source: {
    type: String
  },
  size: {
    type: Number //in kb
  },
  length: {
    type: Number // in secs
  },
  meta: {
    type: Object
  },
  watchCount: {
    type: Number,
    default: 0
  },
  path: {
    type: String
  },
  tags: {
    type: Array
  },
  updatedBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

videoSchema.statics.paginateQuery = function(query, callback) {
  var Video = this;
  query = paginate.formatQuery(query);
  Video.find(query.filter)
    .sort(query.sort)
    .select(query.select)
    .skip(query.skip)
    .limit(query.limit)
    .exec(callback);
};

videoSchema.statics.createVideo = function(data, callback) {
  var Video = this;
  Video.findOne()
    .sort({
      serialNo: -1
    })
    .exec(function(err, video) {
      if (err) {
        callback(err);
      } else if (!video) {
        data.serialNo = 1;
        Video.create(data, callback);
      } else {
        data.serialNo = video.serialNo + 1;
        Video.create(data, callback);
      }
    });
};

module.exports = mongoose.model("video", videoSchema);
