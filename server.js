const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3010;
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient

var db;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray((err, results) => {
		// console.log(results);
		res.render('', {quotes: results});
		
	});
	// res.sendFile(__dirname + '/index.html');
});
app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, response) => {
		if(err) return console.log(err);
			console.log('saved to db');
		res.redirect('/');
	});
});

MongoClient.connect('mongodb://testMongo:testMongo@ds157500.mlab.com:57500/star-wars-quote', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(port, () => {
		console.log(`listening on ${port}`);
	});

});
