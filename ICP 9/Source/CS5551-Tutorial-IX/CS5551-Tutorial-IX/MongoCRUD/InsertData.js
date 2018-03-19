/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://sireesha:12345@ds215019.mlab.com:15019/asedemo';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
var insertDocument = function(db, callback) {
    db.collection('users').insertOne( {
        "fname" : "Sireesha",
        "lname" : "Pandala",
        "address":{
            "city":"Kansas City",
            "state":"MO",
            "phoneno":"8166058945"
        },
        "education" : {
            "university":"UMKC",
            "degree":"Master of Science",
            "major":"Computer Science"
        },
        "mail":"sp3dp@mail.umkc.edu"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the asedemo collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});