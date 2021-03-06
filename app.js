var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
//템플릿설정
app.set('view engine', 'pug');
app.set('views', './views');
//템플릿설정

//app.use(express.static('이름'));- 이름 폴더를 정적 파일 보관소로 지정
app.use(express.static('public'));
//폴더안에 a.png가 있으면 접속시 127.0.0.1/a.png로 가능
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic/0">JavaScript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
})
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'pug'});
})
//app.get()-위치에 가면 무엇을 띄울지 확인
app.get('/', function(req, res){
    res.send('Hello home page');;
});
// /=루트
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
