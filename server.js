
const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

// Express settings
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
    
app.use(express.static(process.cwd()+"/app/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/app/index.html")
});
// POST File
app.post('/api/upload', multipartMiddleware, function (req, res) {
console.log(req.body, req.files);
    res.send(req.files);
});

// POST Data
app.post('/api/form', (req, res) => {
console.log(req.body);
    res.send(req.body);
});

// Create PORT
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})

// Find 404 and hand over to error handler
app.use(function (req, res, next) {
  res.status(404).sendFile(process.cwd()+"/app/index.html")
})
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
