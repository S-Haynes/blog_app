const express 	  = require('express'),
	  app    	  = express(),
	  bodyParser  = require('body-parser'),
	  mongoose    = require('mongoose'),
	  methodOverride = require('method-override')

// APP CONFIG
mongoose.connect('mongodb://localhost/blog_app');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

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

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	let id = req.params.id;
	Blog.findById(id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs');
		} else {
			res.render('show', {blog: foundBlog});
		}
	});
});

//EDIT ROUTE

app.get("/blogs/:id/edit", function(req, res){
	let id = req.params.id;
	Blog.findById(id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs')
		} else {
			res.render('edit', {blog: foundBlog});
		}
	})

})

// UPDATE ROUTE

app.put('/blogs/:id', function(req, res){
	let id = req.params.id;
	let body = req.body.blog;
	Blog.findByIdAndUpdate(id, body, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + id)
		}
	})
});

app.listen(4000, function(){
	console.log("server started")
});

