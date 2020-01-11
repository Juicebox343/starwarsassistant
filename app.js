const bodyParser 		= require('body-parser'),
	  methodOverride    = require('method-override'),
	  expressSanitizer  = require('express-sanitizer'),
	  express           = require('express'),
	  mysql 			= require('mysql'),
	  db 				= require('./db_connect.js'),
	  app               = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

const port = 3000;

//requiring routes
const indexRoutes = require('./routes/index'),
	  characterRoutes = require('./routes/characters');

app.use("/", indexRoutes); //This has the landing page, the login, login logic, and user registration
app.use("/characters", characterRoutes); //this handles all character routing
app.use('/characters/:id/inbox', require('./routes/inbox'));

app.listen(port, () => console.log('The wdf server has started'));