const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const {connectToMongoose } = require('./config/connect');
const staticRoute = require('./routes/staticRoutes');
const userRoute = require('./routes/userRoutes');
const dashboardRoute = require('./routes/dashboardRoutes');

const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');




const app = express();
const PORT = 8080;

connectToMongoose('mongodb://localhost:27017/to-do-lists')
.then( ()=> { console.log('Successfully Connect mongoose database')})
.catch( (err) => { console.log(`Mongoose connect err  ${err}`) })

//view
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views')); 

app.use( express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use( cookieParser() );

//middleware
app.use(express.urlencoded({ extended: false }));


//Routes
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);
app.use('/dashboard', restrictToLoggedInUserOnly, dashboardRoute);


app.listen(PORT, ()=> console.log(`Server is running at PORT ${PORT}`));