var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');


function createTemplate(data) {
    var title=data.title;
    var content=data.content;
var htmlTemplate = `
<html>
<head>
</head>
<body>
<h1>${title}</h1>
<div>${content}</div>
</body>
</html>
`;
 return htmlTemplate;
}

var config = {
    user: 'ktssaiteja',
    database: 'ktssaiteja',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString();
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this_is_a_salt');
    res.send(hashedString);
});
var pool = new Pool(config);

app.get('/test-db', function (req, res) {
  pool.query('Select * FROM "user"', function(err, result) {
      if(err)
      {
          res.status(500).send(err.toString());
      } else
      {
          res.send(JSON.stringify(result.rows));
      }
});
});

app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
     if(err)
      {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length===0)
      {
          res.status(404).send('Article Not Found:(');
      }  else
      {
          var articleData=result.rows[0];
          res.send(createTemplate(articleData));
      }
      }
    });
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
