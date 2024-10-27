/**
 * nodemon을 활용하면 저장되는 내용에 대해서 바로바로 수정된 결과를 볼 수 있음
 * npm install nodemon --g 명령어로 nodemon을 global로 설치
 * 
 * html대신 서버에서 쓰기 좋은 동적 웹사이트 탬플릿 엔진을 가진 ejs를 이용
 */

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname + '/public'));

//라우팅
app.get('/', (req, res) => {
  res.render('index');  
});

app.get('/profile', (req, res) => {
  res.render('profile'); 
});

app.get('/map', (req, res) => {
  res.render('map');  
}); 

app.get('/contact', (req, res) => {
  res.render('contact');  
});
  
//일단 화면에 띄우기는 했는데 이걸 database랑 연동해봐야겠지? 예를들면 supabase
app.post('/contactProc', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;
  var a = `${name} ${phone} ${email} ${memo}` //변수를 넣고 싶을때는 '작은 따움표가 아니라 `백 따움표 사용 ~에 있는
  res.send(a);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});