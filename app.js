const bodyParser 		= require('body-parser'),
	  methodOverride    = require('method-override'),
	  expressSanitizer  = require('express-sanitizer'),
	  express           = require('express'),
	  app               = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

const port = 3000;

//requiring routes
const indexRoutes = require('./routes/index'), //This has the landing page, the login, login logic, user registration, and main user page		  
	  characterRoutes = require('./routes/characters'),  //this handles all character routing
	  inboxRoutes = require('./routes/inbox'), //inbox routing
	  campaignManagerRoutes = require('./routes/campaign-manager'), //this handles all campaign routing
	  sessionManagerRoutes = require('./routes/session-manager'); //this handles all session routing

app.use("/", indexRoutes);
app.use("/characters", characterRoutes);
app.use('/characters/:id/inbox', inboxRoutes);
app.use('/campaign-manager', campaignManagerRoutes);
app.use('/campaign-manager/:id/session-manager', sessionManagerRoutes);

app.listen(port, () => console.log('The sw assistant server has started'));