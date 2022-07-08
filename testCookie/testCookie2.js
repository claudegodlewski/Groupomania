var express = require('express');
var app = express();
var PORT = 3000;

// With middleware
app.use('/', function(req, res, next){
	res.cookie('title', 'GeeksforGeeks');
	res.send("Cookie Set");
	next();
})

app.get('/', function(req, res){
	console.log('Cookie SET');
});

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
