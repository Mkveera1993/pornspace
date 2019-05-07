"use strict";

var config = require("../config/default-config");

var Util = function() {
  this.formatQuery = function(request) {
    var query = {
      sort: {},
      filter: {},
      select: {},
      page: 0,
      limit: config.pagelimit
    };
    if (request.filter) {
      var queryObj = {};
      for (var key in request.filter) {
        var val = request.filter[key];
        if (val instanceof Array) {
          var $in = [];
          for (const i of val) {
            $in.push(i);
          }
          queryObj[key] = { $in: $in };
        } else {
          queryObj[key] = val;
        }
      }
      query.filter = queryObj;
    }
    if (request.sort) {
      query.sort = request.sort;
    }
    if (request.page) {
      query.page = request.page;
    }
    if (request.limit) {
      query.limit = request.limit;
    }
    if (request.select) {
      query.select = request.select;
    }
    if (request.skip) {
      query.skip = request.skip;
    } else {
      query.skip = (query.page - 1) * query.limit;
    }
    return query;
  };
};

module.exports = new Util();
