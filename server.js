var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
    user: 'lucy31',
    database: 'webapp',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60*24*30}
}));
var article={
 'article-one':{    
    title: 'Article One | Lonika Ghosh',
    heading : 'Article One',
    content: `            
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>`},
        
 'article-two':{    
    title: 'Article Two | Lonika Ghosh',
    heading : 'Article Two',
    content: `            
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>`
     
 },
        
 'article-three':{   
    title: 'Article Three | Lonika Ghosh',
    heading : 'Article Three',
    content: `            
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>
        <p>This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.This is the content for my first article. Its really nice to write a code like this. I love making such websites and would love to develop one soon enough.
        </p>`
     
 },
};

app.post('/signup' ,function (req,res){
    var userid = req.body.userid;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var salt = crypto.RandomBytes(128).toString('hex');
    var dbString = hash(password , salt);
    pool.query('INSERT INTO "Users" (Name,Email,UserId,Password) VALUES($1,$2,$3,$4)' , [name, email, userid, dbString], function(err, result){
            if (err) {
                res.status(500).send(err.toString());
            } else {
            res.send('User successfully created: '+ userid);
            }
    });
});

app.post('/login' ,function (req,res){
    var userid = req.body.userid;
    var password = req.body.password;
    pool.query('SELECT * FROM "Users" WHERE userid = $1' , [userid], function(err, result){
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if( result.rows.length === 0){
                    res.send(403).send('userid/password is invalid');
                }
                else{
                    var dbString = result.rows[0].password;
                    var salt = dbString.split('$')[2];
                    var hashedPassword = hash(password,salt);
                    if(hashedPassword === dbString)
                    {    
                        req.session.auth = {userid : result.rows[0].id};
                        res.send('Credentials correct');
                    }else{
                    res.send(403).send('userid/password is invalid');                        
                    }
                }
            }
    });    
});

app.get('/check-login', function(req,res){
    if(req.session && req.session.outh && req.session.auth.userid){
        res.send('You are logged in: '+ res.session.auth.userid.toString());
    }else{
        res.send('You are not logged in');
    }
});

app.get('/logout', function(req,res){
    delete req.session.auth;
    res.send('logged out');
});

var pool = new Pool(config);
 app.get('/Users', function (req, res) {
    pool.query('SELECT * FROM Users', function (err, result) {
        if (err) {
          res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
  });
  
  function hash(input, salt){
      var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
      return ["pbkdf2" , "10000" , salt, hashed.toString('hex')].join('$');
  }
  
  app.get('/hash/:input', function(req,res){
      var hashedString = hash(req.params.input, 'this-is-some-random-string');
      res.send(hashedString);
  });
  
function createTemplate(data) {
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    
    var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head> 
          <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${content}
                </div>
            </div>
          </body>
        </html>
`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indian.html'));
});

app.get('/ui/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/ui/blank.txt', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blank.txt'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(article[articleName]));
});

app.get('/indian', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indian.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/AndhraPradesh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'AndhraPradesh.html'));
});

app.get('/ui/ArunachalPradesh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ArunachalPradesh.html'));
});

app.get('/ui/Assam.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Assam.html'));
});


app.get('/ui/Bihar.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Bihar.html'));
});

app.get('/ui/Chhattisgarh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Chhattisgarh.html'));
});

app.get('/ui/Goa.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Goa.html'));
});

app.get('/ui/Gujarat.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Gujarat.html'));
});

app.get('/ui/Haryana.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Haryana.html'));
});

app.get('/ui/HimachalPradesh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'HimachalPradesh.html'));
});

app.get('/ui/JK.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'JK.html'));
});

app.get('/ui/Jharkhand.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Jharkhand.html'));
});

app.get('/ui/Karnataka.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Karnataka.html'));
});

app.get('/ui/Kerala.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Kerala.html'));
});

app.get('/ui/MadhyaPradesh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'MadhyaPradesh.html'));
});

app.get('/ui/Maharashtra.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Maharashtra.html'));
});

app.get('/ui/Manipur.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Manipur.html'));
});

app.get('/ui/Meghalaya.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Meghalaya.html'));
});

app.get('/ui/Mizoram.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Mizoram.html'));
});

app.get('/ui/Nagaland.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Nagaland.html'));
});

app.get('/ui/Odisha.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Odisha.html'));
});

app.get('/ui/Punjab.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Punjab.html'));
});

app.get('/ui/Rajasthan.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Rajasthan.html'));
});

app.get('/ui/TamilNadu.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'TamilNadu.html'));
});

app.get('/ui/Telangana.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Telangana.html'));
});

app.get('/ui/Tripura.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Tripura.html'));
});

app.get('/ui/UttarPradesh.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'UttarPradesh.html'));
});

app.get('/ui/Uttarakhand.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Uttarakhand.html'));
});

app.get('/ui/WestBengal.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'WestBengal.html'));
});

app.get('/ui/me.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me.png'));
});

app.get('/ui/lonika.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lonika.jpg'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/italian.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'italian.jpg'));
});

app.get('/ui/chinese.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'chinese.jpg'));
});

app.get('/ui/continental.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'continental.jpg'));
});

app.get('/ui/AndhraPradesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'AndhraPradesh.jpg'));
});

app.get('/ui/Assam.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Assam.jpg'));
});

app.get('/ui/ArunachalPradesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ArunachalPradesh.jpg'));
});

app.get('/ui/Assam.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Assam.jpg'));
});

app.get('/ui/Bihar.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Bihar.jpg'));
});

app.get('/ui/Chattisgarh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Chattisgarh.jpg'));
});

app.get('/ui/Goa.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Goa.jpg'));
});

app.get('/ui/Gujrat.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Gujrat.jpg'));
});

app.get('/ui/Haryana.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Haryana.jpg'));
});

app.get('/ui/HimachalPradesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'HimachalPradesh.jpg'));
});

app.get('/ui/JK.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'JK.jpg'));
});

app.get('/ui/Jharkhand.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Jharkhand.jpg'));
});

app.get('/ui/Karnataka.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Karnataka.jpg'));
});

app.get('/ui/Kerala.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Kerala.jpg'));
});

app.get('/ui/MadhyaPradesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'MadhyaPradesh.jpg'));
});

app.get('/ui/Maharashtra.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Maharashtra.jpg'));
});

app.get('/ui/Manipur.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Manipur.jpg'));
});

app.get('/ui/Meghalaya.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Meghalaya.jpg'));
});

app.get('/ui/Mizoram.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Mizoram.jpg'));
});

app.get('/ui/Nagaland.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Nagaland.jpg'));
});

app.get('/ui/Odisha.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Odisha.jpg'));
});

app.get('/ui/Punjab.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Punjab.jpg'));
});

app.get('/ui/Rajasthan.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Rajasthan.jpg'));
});

app.get('/ui/TamilNadu.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'TamilNadu.jpg'));
});

app.get('/ui/Telangana.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Telangana.jpg'));
});

app.get('/ui/Tripura.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Tripura.jpg'));
});

app.get('/ui/UttarPradesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'UttarPradesh.jpg'));
});

app.get('/ui/Uttarakhand.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Uttarakhand.jpg'));
});

app.get('/ui/WestBengal.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'WestBengal.jpg'));
});

app.get('/ui/indian.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indian.jpg'));
});

app.get('/ui/samosa.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'samosa.jpg'));
});

app.get('/ui/kulfi.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kulfi.jpg'));
});

app.get('/ui/gulabjamun.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'gulabjamun.jpg'));
});

app.get('/ui/rasgulla.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rasgulla.jpg'));
});

app.get('/ui/ladoo.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ladoo.jpg'));
});

app.get('/ui/kajubarfi.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kajubarfi.jpg'));
});

app.get('/ui/payasam.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'payasam.jpg'));
});

app.get('/ui/phirni.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'phirni.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
