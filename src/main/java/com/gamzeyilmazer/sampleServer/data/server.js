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
  console.log(body);
  if (req.method === "PUT") {
    res.json({ message:"User created successfully", name: req.body.author});
  }else{
      //Not a post request. Let db.json handle it
      next();
  }
});

server.use('/api',router);
server.listen(port);