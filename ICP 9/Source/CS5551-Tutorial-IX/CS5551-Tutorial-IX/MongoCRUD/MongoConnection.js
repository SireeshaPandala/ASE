/**
 * Created by Rohith Kumar
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://sireesha:12345@ds215019.mlab.com:15019/asedemo';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

/*
url :   mongodb://root:secure@ds161483.mlab.com:61483/asefall17
 */