var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID,
    request = require("request");

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('nobelprizesdb', server);

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}
// handleError(res, "Invalid user input", "Must provide a first or last name.", 400);


db.open(function(err, db) {
    if (!err) {
        console.log("Connected to mongodb database");
        db.collection('nobelprizes', {
            strict: true
        }, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data.");
                populateDB();
            } else {
                collection.find().count(function(err, count) {
                    if (err) {
                        console.log("The collection doesn't exist. Creating it with sample data.");
                        populateDB();
                    } else if (count === 0) {
                        console.log("The collection doesn't exist. Creating it with sample data.");
                        populateDB();
                    } else {
                      console.log("Record count -> " + count);
                    }
                });
            }
            //console.log("creating index");
            //collection.createIndex({"$**": "text"});
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving nobelprize with id -> ' + id);
    var _id;
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found with id -> " + id
        });
        return;
    }
    db.collection('nobelprizes', function(err, collection) {
        collection.findOne({
            '_id': _id
        }, function(err, item) {
            if (err) {
                res.status(500).send({
                    'error': 'An error occurred. ' + err
                });
            } else {
                res.send(item);
            }
        });
    });
};

exports.findAll = function(req, res) {
    var query = req.query.query;
    if (query) {
        console.log('query -> ' + query);
        db.collection('nobelprizes', function(err, collection) {
            collection.find({
                $text: {
                    $search: query
                }
            }).toArray(function(err, items) {
                if (err) {
                    res.status(500).send({
                        'error': 'An error occurred. ' + err
                    });
                } else {
                    res.send(items);
                }
            });
        });
    } else {
        db.collection('nobelprizes', function(err, collection) {
            collection.find().toArray(function(err, items) {
                if (err) {
                    res.status(500).send({
                        'error': 'An error occurred. ' + err
                    });
                } else {
                    console.log('items -> ' + items.length);
                    res.send(items);
                }
            });
        });
    }
};

exports.addNobelPrize = function(req, res) {
    var nobelprize = req.body;
    console.log('Adding nobelprize: ' + JSON.stringify(nobelprize));
    db.collection('nobelprizes', function(err, collection) {
        collection.insert(nobelprize, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.status(500).send({
                    'error': 'An error has occurred. ' + err
                });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateNobelPrize = function(req, res) {
    var id = req.params.id;
    var nobelprize = req.body;
    console.log('Updating nobelprize with id -> ' + id);
    var _id;
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found"
        });
        return;
    }
    db.collection('nobelprizes', function(err, collection) {
        collection.update({
            '_id': _id
        }, nobelprize, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log('Error updating nobelprize. ' + err);
                res.status(500).send({
                    'error': 'An error occurred. ' + err
                });
            } else {
                console.log('Document(s) updated.');
                res.send(nobelprize);
            }
        });
    });
}

exports.deleteNobelPrize = function(req, res) {
    var id = req.params.id;
    var _id;
    console.log('Deleting nobelprize with id -> ' + id);
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found."
        });
        return;
    }
    db.collection('nobelprizes', function(err, collection) {
        collection.remove({
            '_id': _id
        }, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.status(500).send({
                    'error': 'An error occurred. ' + err
                });
            } else {
                console.log('Document(s) deleted.');
                res.send(req.body);
            }
        });
    });
}



var populateDB = function() {

    var url = 'http://api.nobelprize.org/v1/prize.json';
    var nobelprizes = [];
    request({
        url: url,
        json: true
    }, function(err, response, body) {
        if (err) {
            console.log('An error occured. ' + err);
        } else {
            if (response.statusCode === 200) {
                console.log('Successfully connected to ' + url);
                nobelprizes = body.prizes;
                if (nobelprizes && nobelprizes.length > 0) {
                    db.collection('nobelprizes', function(err, collection) {
                        collection.insert(nobelprizes, {
                            safe: true
                        }, function(err, result) {
                            if (err) {
                                console.log('An error occured. ' + err);
                            } else {
                                console.log('Successfully added content');
                            }
                        });
                    });
                }
            } else {
                console.log('An error occured. Status code ' + response.statusCode);
            }
        }
    });
};
