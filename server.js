var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(Article[articleName]));
});

app.get('/article-two',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/me.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me.png'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
