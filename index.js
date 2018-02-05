const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router     = require('./routes/news/routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;
 
// connect router
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);