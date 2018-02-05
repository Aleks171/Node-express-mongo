const express   = require('express');
const router 	= express.Router();
const DB = require('../../database.js');

router.route('/news')

    // get all news
    .get(function(req, res) {
        const database = new DB();
        database.connect(database.URI)
        .then(function() {
            return database.getAllNews();
        })
        .then(function(result) {
            res.json(result);
            database.close();
        })
        .catch(function(error) {
            if (error) throw error
        });
    })

    // create a single news
    .post(function(req, res) {
        const database = new DB();
        database.connect(database.URI)
        .then(function() {
            const news = req.body;
            return database.addOneNews(news);
        })
        .then(function() {
            res.json({ message: 'News was created successfully!' });
            database.close();
        })
        .catch(function(error) {
            if (error) throw error
        });
    });

router.route('/news/:news_id')

    // get the news with id
    .get(function(req, res) {
        const database = new DB();
        database.connect(database.URI)
        .then(function() {
            const newsId = req.params.news_id;
            return database.getOneNews(newsId);
        })
        .then(function(result) {
            res.json(result);
            database.close();
        })
        .catch(function(error) {
            if (error) throw error
        });       
    })

    //update the news with id
    .put(function(req, res) {
        const database = new DB();
        database.connect(database.URI)
        .then(function() {
            const newsId = req.params.news_id;
            const newValue = req.body;
            return database.updateNews(newsId, newValue);
        })
        .then(function(result) {
            res.json(result);
            database.close();
        })
        .catch(function(error) {
            if (error) throw error
        });       
    })

    //delete the news with id
    .delete(function(req, res) {
        const database = new DB();
        database.connect(database.URI)
        .then(function() {
            const newsId = req.params.news_id;
            return database.deleteNews(newsId);
        })
        .then(function(result) {
            res.json(result);
            database.close();
        })
        .catch(function(error) {
            if (error) throw error
        });        
    });

module.exports = router;