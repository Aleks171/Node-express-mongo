const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const URI = "";

// The MongoDB database connection
function DB() {
    this.URI = URI;
    this.db = null;
    this.dbClient = null;
}

DB.prototype.connect = function(uri) {
    return new Promise((resolve, reject) => {
		if (this.db) {
			resolve();
		} else {
			MongoClient.connect(uri)
			.then(
				(database) => {
                    this.db = database.db('charity_project');
                    this.dbClient = database;
                    console.log('Connected to database!');
					resolve();
				},
				(err) => {
					console.log("Error connecting: " + err.message);
					reject(err.message);
				}
			)
		}
	});
}

DB.prototype.close = function() {
	if (this.db) {
		this.dbClient.close()
		.then(
			function() {
                console.log('Connection closed');
            },
			function(error) {
				console.log("Failed to close the database: " + error.message)
			}
		)	
	}
}

DB.prototype.addOneNews = function(news) {
    return new Promise((resolve, reject) => {
        this.db.collection('news').insertOne(news)
            .then(function() {
                console.log('News successfully inserted');
                resolve();
            },
            function(error) {
                console.log('Add news failed: ' + error.message);
                reject(error);
            }
        );
    });
}

DB.prototype.getOneNews = function(newsId) {
    return new Promise((resolve, reject) => {
        this.db.collection('news').findOne({ _id: ObjectId(newsId)})
        .then(function(result) {
            console.log('News found!');
            resolve(result);
        },
        function(error) {
            console.log('Error when getting the news by ID: ' + error.message);
            reject(error);
        });
    });
}

DB.prototype.getAllNews = function(doc) {
    return new Promise((resolve, reject) => {
        this.db.collection('news').find().toArray()
        .then(function(result) {
            console.log('News were received successfully');
            resolve(result);
        },
        function(error) {
            console.log('Failed to get all news: ' + error.message);
            reject(error);
        });
    });
}

DB.prototype.updateNews = function(newsId, newValue) {
    return new Promise((resolve, reject) => {
        const query = {_id: ObjectId(newsId)};
        this.db.collection('news').updateOne(query, {$set: newValue})
        .then(function(result) {
            console.log('The news was updated successfully');
            resolve();
        })
        .catch(function(error) {
            console.log('The news update failed: ' + error.message);
            reject(error);
        });
    });
}

DB.prototype.deleteNews = function(newsId) {
    return new Promise((resolve, reject) => {
        this.db.collection('news').deleteOne({ _id: ObjectId(newsId) })
        .then(function() {
            console.log('News was successfully deleted');
            resolve();
        },
        function(error) {
            console.log('Failed to delete the news; ' + error.message);
            reject(error);
        });
    });
}

module.exports = DB;