const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
var db = require('./db.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
  console.log("PUT request listener");
  const body = req.body;
  console.log("Title",req.body['title']);
  let checkTitle = db.books.map(book => book.title);
  let checkAuthor = db.books.map(book => book.author);
  console.log("Arg",checkTitle);
  if (req.method === "PUT") {
    if(checkTitle.includes(req.body['title']) )
    {console.log("Another book with similar title and author already exists.")
        res.status(400).jsonp({
                    error: "Another book with similar title and author already exists."
               });
    }

    else{
    console.log("Added successfully")
         res.json({ message:"User created successfully", name: req.body.author});

    }

  }else{
      //Not a post request. Let db.json handle it
      next();
  }
});

server.use('/api',router);
server.listen(port);