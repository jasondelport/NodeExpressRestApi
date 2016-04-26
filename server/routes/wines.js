var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('winedb', server);

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}
// handleError(res, "Invalid user input", "Must provide a first or last name.", 400);


db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {
            strict: true
        }, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
            /*
            console.log("creating index");
            collection.db.wines.createIndex({
                "$**": "text"
            });
            */
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    var _id;
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found with id " + id
        });
        return;
    }
    db.collection('wines', function(err, collection) {
        collection.findOne({
            '_id': _id
        }, function(err, item) {
            if (err) {
                res.status(500).send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                res.send(item);
            }
        });
    });
};

exports.findAll = function(req, res) {
    var query = req.query.query;
    console.log('query -> ' + query)
    if (query) {
        db.collection('wines', function(err, collection) {
            collection.find({
                $text: {
                    $search: query
                }
            }).toArray(function(err, items) {
                if (err) {
                    res.status(500).send({
                        'error': 'An error has occurred - ' + err
                    });
                } else {
                    res.send(items);
                }
            });
        });
    } else {
        db.collection('wines', function(err, collection) {
            collection.find().toArray(function(err, items) {
                if (err) {
                    res.status(500).send({
                        'error': 'An error has occurred - ' + err
                    });
                } else {
                    res.send(items);
                }
            });
        });
    }
};

exports.addWine = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.insert(wine, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.status(500).send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    var _id;
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found"
        });
        return;
    }
    db.collection('wines', function(err, collection) {
        collection.update({
            '_id': _id
        }, wine, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.status(500).send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    var _id;
    console.log('Deleting wine: ' + id);
    try {
        _id = ObjectID(id);
    } catch (err) {
        res.status(404).send({
            error: "Record not found"
        });
        return;
    }
    db.collection('wines', function(err, collection) {
        collection.remove({
            '_id': _id
        }, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.status(500).send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {

    var wines = [{
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    }, {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('wines', function(err, collection) {
        collection.insert(wines, {
            safe: true
        }, function(err, result) {});
    });

};
