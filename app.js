const express 	  = require('express'),
	  app    	  = express(),
	  bodyParser  = require('body-parser'),
	  mongoose    = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MONGOOSE/MODEL CONFIG
let blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

let Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES
app.get('/', function(req, res){
	res.redirect('/blogs')
});


// INDEX ROUTE
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err)
		} else {
			res.render('index', {blogs: blogs});
		}
	});
	
});

// NEW ROUTE
app.get('/blogs/new', function(req, res){
	res.render('new');
});

// CREATE ROUTE 
app.post('/blogs', function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render('new');
		} else {
			res.redirect('/blogs')
		}
	});
});

app.listen(4000, function(){
	console.log("server started")
});

