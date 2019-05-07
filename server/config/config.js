'use strict';
var env = process.env.app;
var config = {
  "dev": {
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/",
      "dbName": "dev_pornspace",
      "options": {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    },
    "secrets": {
      "session": 'dev-readanlytics'
    },
    "aws": {
      "access_key_id": "AKIAJ7J2RUWMQILZT6EA",
      "secret_access_key": "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",
      "s3_bucketname": "pornspace",
      "region": "us-east-1"
    }

  },
  "prod": {
    "mongo": {
      "uri": "mongodb://127.0.0.1:27017/",
      "dbName": "pornspace",
      "options": {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    },
    "secrets": {
      "session": 'readanlytics'
    }

  }

};

module.exports = env ? config[env] : config.dev;
