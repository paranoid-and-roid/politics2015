var express	= require('express');
var app		= express();

app.use(express.static(__dirname));

app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 9000;

app.listen(port);
console.log('Listening on port ' + port);