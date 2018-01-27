const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const port = process.env.PORT || 5000;

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Static Folder
app.use(express.static(`${__dirname}/public`));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
